import React, {useState, useEffect} from 'react';
import {View, Text, TouchableWithoutFeedback, Button, StyleSheet, Modal, ScrollView} from 'react-native';
import { Calendar, CalendarList } from 'react-native-calendars';
import { MaterialIcons } from '@expo/vector-icons';
import { globalStyles } from '../styles/global';
import db, { streamBookings } from '../db/firestore';
import { withRepeat } from 'react-native-reanimated';


/**
 * Search function to access fields in nested objects
 * 
 * @param {*} o - Nested object to look for data in
 * @param {*} s - String name of 
 */
Object.byString = function(o, s) {
    s = s.replace(/\[(\w+)\]/g, '.$1'); 
    s = s.replace(/^\./, '');           
    var a = s.split('.');
    for (var i = 0, n = a.length; i < n; ++i) {
        var k = a[i];
        if (k in o) {
            o = o[k];
        } else {
            return;
        }
    }
    return o;
}


const CalendarViewScreen = ({navigation}) => {

function bookMarkingsPopulate(){  
        const reduced = bookings.reduce((acc, currentItem) => {
            const {weddingDate, ...details} = currentItem;
            acc[weddingDate] = {...details, selected: true, selectedColor: '#CE97B0'
            };
        
            return acc;
            },{});
            setItems(reduced);
            
        };

    const [items, setItems] = useState({
        // '2021-09-04': [{}],
        // '2021-09-11': [{}],
        '2021-09-18': {dots: [notAvailable], selected: false},
     
    });
    const [bookings, setBookings ] = useState('')

    const mapDocToBooking = (document) => {
        return {
            id: document.id,
            name: document.data().name,
            createdAt: document.data().createdAt,
            weddingDate: document.data().weddingDate,
            venueName: document.data().venueName,
            numberOfMakeups: document.data().numberOfMakeups,
            bookingName: document.data().bookingName,
            venuePostcode: document.data().venuePostcode,
            numberOfBrides: document.data().numberOfBrides,
            numberOfMothersBridesmaids : document.data().numberOfMothersBridesmaids,
            juniorBridesmaids: document.data().juniorBridesmaids,

        };
    };

    useEffect(() => {
        const unsubscribe = streamBookings({
            next: querySnapshot => {
                const bookings = querySnapshot
                .docs.map(docSnapshot => mapDocToBooking(docSnapshot));
                setBookings(bookings);
            },
            error: (error) => console.log(error),
        });
        return unsubscribe
    }, [setBookings]);


    useEffect(()=>{
       
        try{
            bookMarkingsPopulate();
        }
        catch(err){
            console.log(err.message)
        }
        
    }, [bookings])

    let str = '';


    const notAvailable = {key: 'notAvailable', color: 'red'};
    const massage = {key: 'massage', color: 'blue', selectedDotColor: 'blue'};
    const workout = {key: 'workout', color: 'green'};
    
    const [selectedDate, setSelectedDate] = useState(''); 
    

    const [modalOpen, setModalOpen] = useState(false);
    return(
        
        <View style={styles.container}>
            
            
            
            <CalendarList 

             theme={{backgroundColor: '#FDEFEF', calendarBackground: '#FDEFEF',}}


            onDayPress={(day) => {setModalOpen(true); setSelectedDate(day.dateString);  }}

            markingType={'dot'}
            markedDates={items} 
            />
            
            
            <Modal visible={modalOpen} animationType='slide'>
                <View style={{backgroundColor: '#FDEFEF', flex: 1, alignContent: 'center', }}>
                <View style={{flexDirection: 'row'}}>
                    <View style={{flex: 3}}></View>
                    <View style={{flex: 1}}>
                        <MaterialIcons
                            name='close'
                            size={26}
                            style={globalStyles.modalToggle}
                            onPress={() => setModalOpen(false)}
                            />
                    </View>
                </View>

                <View style={{
            shadowColor: 'rgb(0, 0, 0)',
            shadowOffset: {
              width: 3,
              height: 3,
            },
            shadowOpacity: 0.5,
            shadowRadius: 6,
            elevation: 2,
            backgroundColor: 'white',

            padding: 20,
            margin: 20,
            
          }}>
                    
                    
                    <View style={{height: 1}}>
                    
                    <Text style={{color:'#ffffff'}}>{venueNameText = selectedDate + '.venueName'}</Text>
                    <Text style={{color:'#ffffff'}}>{bookingNameText = selectedDate + '.bookingName' }</Text>
                    <Text style={{color:'#ffffff'}}>{postcodeText = selectedDate + '.venuePostcode'}</Text>
                    <Text style={{color:'#ffffff'}}>{numberOfMakeupsText = selectedDate + '.numberOfMakeups' }</Text>
                    </View>
                    <Text></Text>
                    <Text></Text>
                    <Text style={{fontWeight:'400', fontSize:25, textAlign:'center', textDecorationLine:'underline'}}>{selectedDate}</Text>
                    <Text></Text>
                    <Text></Text>
                    <Text style={{fontWeight:'bold', fontSize:25, textAlign:'center'}}>Venue:</Text>
                    <Text style={{fontWeight:'300', fontSize:20, textAlign:'center'}}>{Object.byString(items, venueNameText )}</Text>
                    <Text></Text>
                    <Text></Text>
                    <Text style={{fontWeight:'bold', fontSize:25, textAlign:'center'}}>Ceremony Time:</Text>
                    <Text style={{fontWeight:'300', fontSize:20, textAlign:'center'}}>{Object.byString(items, numberOfMakeupsText )}</Text>
                    <Text></Text>
                    <Text></Text>
                    <Text style={{fontWeight:'bold', fontSize:25, textAlign:'center'}}>Booking Name: </Text>
                    <Text style={{fontWeight:'300', fontSize:20, textAlign:'center'}}>{Object.byString(items, bookingNameText )}</Text>
                    <Text></Text>
                    <Text></Text>
                    <Text style={{fontWeight:'bold', fontSize:25, textAlign:'center'}}>Venue Postcode: </Text>
                    <Text style={{fontWeight:'300', fontSize:20, textAlign:'center'}}>{Object.byString(items, postcodeText )}</Text>
                    <Text></Text>
                    <Text></Text>
                    <Text style={{fontWeight:'bold', fontSize:25, textAlign:'center'}}>Number of Makeups:</Text>
                    <Text style={{fontWeight:'300', fontSize:20, textAlign:'center'}}>{Object.byString(items, numberOfMakeupsText )}</Text>
                    
                </View>
                </View>
            </Modal>
            
        </View>
    );
};

export default CalendarViewScreen;

const styles = StyleSheet.create({
    
    container: {
       
        backgroundColor: '#FDEFEF'
    },
});