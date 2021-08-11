import React, {useState, useEffect} from 'react';
import {View, Text, Button, StyleSheet, Modal, ScrollView} from 'react-native';
import { Calendar, CalendarList } from 'react-native-calendars';
import { MaterialIcons } from '@expo/vector-icons';
import { globalStyles } from '../styles/global';
import db, { streamBookings } from '../db/firestore';



const CalendarViewScreen = ({navigation}) => {

    const [items, setItems] = useState({
        // '2021-09-04': [{}],
        // '2021-09-11': [{}],
        '2021-09-18': {dots: [notAvailable], selected: false},
        '2021-09-25': {dots: [massage, workout], disabled: true}
    });
    const [bookings, setBookings ] = useState()

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
    

    

    const notAvailable = {key: 'notAvailable', color: 'red'};
    const massage = {key: 'massage', color: 'blue', selectedDotColor: 'blue'};
    const workout = {key: 'workout', color: 'green'};
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(''); 

    
    return(
        
        <View style={styles.containe}>
            
            <Button title={'Press to reduce'} onPress={() => {
                const reduced = bookings.reduce((acc, currentItem) => {
                const {weddingDate, ...details} = currentItem;
                acc[weddingDate] = {...details, selected: true, selectedColor: 'red'
                };
                // acc[new Date(weddingDate)] = [{marked: true, dotColor: 'red'}];
                return acc;
                },{});
                setItems(reduced);
                console.log(items);
            }}/>
            
            <CalendarList 
            onDayPress={(day) => {setModalOpen(true); setSelectedDate(day.dateString) }}

            markingType={'dot'}
            markedDates={items} 
            />
            
            
            <Modal visible={modalOpen} animationType='slide'>
                <View style={globalStyles.modalStyle}>
                    <MaterialIcons
                            name='close'
                            size={26}
                            style={globalStyles.modalToggle}
                            onPress={() => setModalOpen(false)}
                            />
                </View>
                <View>
                    <Text></Text>
                    <Text style={{fontSize:24}}>                    {selectedDate}</Text>
                    {/* <Text>{}</Text> */}
                </View>
            </Modal>
        </View>
    );
};

export default CalendarViewScreen;

const styles = StyleSheet.create({
    container: {
        
    },
});