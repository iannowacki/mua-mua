import React, {useState, useEffect} from 'react';
import {View, Text, TouchableWithoutFeedback, Button, StyleSheet, Modal, ScrollView} from 'react-native';
import { Calendar, CalendarList } from 'react-native-calendars';
import { MaterialIcons } from '@expo/vector-icons';
import { globalStyles } from '../styles/global';
import db, { streamBookings } from '../db/firestore';



/**
 * Function to parse our particular shape of data structure associated with the calendar 
 * 
 * @param {object} o  object being parsed
 * @param {string} s  string reference whe are
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

/**
 * Screen for showing calendar view. pressing a date opens a modal which displays corresponding booking details
 * 
 * @param {props} param0 navigation props
 */
const CalendarViewScreen = ({navigation}) => {

    /**
     * Function to transform objects from one shape to another as 'items' above
     */
    function bookMarkingsPopulate(){  
        const reduced = bookings.reduce((acc, currentItem) => {
            const {weddingDate, ...details} = currentItem;
            acc[weddingDate] = {...details, selected: true, selectedColor: '#CE97B0'
            };
            return acc;
            },{});
            setItems(reduced);
    };

    /**
     * Data structure where date is key and value are the rest of the fields. used to obtain data to calculate price
     */
    const [items, setItems] = useState({
        '2021-09-18': {dots: [notAvailable], selected: false},
    });
    const [bookings, setBookings ] = useState('')

    /**
     * Function to map data incoming from database to our local 'bookings' variable
     * 
     * @param {object} document incoming structure from firestore.
     */
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

    /**
    * Function streamBookings is used to stream data from database.
    */
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

    /**
     * User settings are currently store as a 'booking' on 2021-09-23. 
     * This function listens for bookings variable being updated from db
     * then sets settings date for data to be read from
     * 
     */
    useEffect(()=>{
        try{
            bookMarkingsPopulate();
        }
        catch(err){
            console.log(err.message)
        }
        
    }, [bookings])

    // Calendar marked dates
    const notAvailable = {key: 'notAvailable', color: 'red'};
    const massage = {key: 'massage', color: 'blue', selectedDotColor: 'blue'};
    const workout = {key: 'workout', color: 'green'};
    
    // variable that holds currently focused date
    const [selectedDate, setSelectedDate] = useState(''); 
    
    // is modal open boolean
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
                <View style={{backgroundColor: '#FDEFEF', flex: 1, justifyContent: 'center' }}>
                    
                <View style={{
                    borderRadius: 10,
                    shadowColor: 'rgb(0, 0, 0)',
                    shadowOffset: {
                    width: 3,
                    height: 3,
                    },
                    shadowOpacity: 0.5,
                    shadowRadius: 10,
                    elevation: 2,
                    backgroundColor: 'white',

                    padding: 20,
                    margin: 20,
                }}>
                    <View style={{flexDirection: 'row'}}>
                        <View style={{flex: 3}}>
                        </View>
                        <View style={{flex: 1}}>
                            <MaterialIcons
                            name='close'
                            size={26}
                            style={globalStyles.modalToggle}
                            onPress={() => setModalOpen(false)}
                            />
                        </View>
                    </View>
                    
                    <Text></Text>
                    <Text></Text>
                    <Text style={{fontWeight:'400', fontSize:25, textAlign:'center', textDecorationLine:'underline'}}>{selectedDate}</Text>
                    <Text></Text>
                    <View style={{height: 1}}>
                        <Text style={{color:'#ffffff'}}>{venueNameText = selectedDate + '.venueName'}</Text>
                        <Text style={{color:'#ffffff'}}>{bookingNameText = selectedDate + '.bookingName' }</Text>
                        <Text style={{color:'#ffffff'}}>{postcodeText = selectedDate + '.venuePostcode'}</Text>
                        <Text style={{color:'#ffffff'}}>{numberOfMakeupsText = selectedDate + '.numberOfMakeups' }</Text>
                </View>
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