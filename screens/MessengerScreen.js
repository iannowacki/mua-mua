import React, { useEffect, useState } from 'react';
import {View, Text, Button, StyleSheet, Modal, TouchableOpacity, TextInput} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { FlatList } from 'react-native-gesture-handler';
import {globalStyles} from '../styles/global';
import db, { streamBookings } from '../db/firestore';


const MessengerScreen = ({navigation}) => {

    /**
     * Data structure where date is key and value are the rest of the fields. used to obtain data to calculate price
     */
    const [bookings, setBookings ] = useState()

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
            createdAt: document.data().createdAt,

            juniorBridesmaidPrice: document.data().juniorBridesmaidPrice,
            bridesmaidMOBPrice: document.data().bridesmaidMOBPrice,
            bridePrice: document.data().bridePrice,
            maxMiles: document.data().maxMiles,
            maxMakeups: document.data().maxMakeups,
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
    
    return(
        <View style={styles.container}>
            <FlatList
                data={bookings}
                renderItem={({item}) => (
                    <View  style={{
                        borderRadius: 10,
                        shadowColor: 'rgb(0, 0, 0)',
                        shadowOffset: {
                          width: 3,
                          height: 3,
                        },
                        shadowOpacity: 0.5,
                        shadowRadius: 6,
                        elevation: 2,
                        backgroundColor: 'white',
            
                        padding: 12,
                        margin: 12,
                      }}>
                    <TouchableOpacity style={styles.flatListItem} onPress={() => navigation.navigate('MessageDetailsScreen', item)}>
                        
                        <Text style={globalStyles.bodyText} >{item.bookingName}</Text>
                        <Text style={{fontSize: 20}} >Subject: New Booking Notification! </Text>
                        <Text >{item.createdAt}</Text>
                        
                    </TouchableOpacity>
                    </View>
                )}
            >
            </FlatList>
        </View>
    );
};


export default MessengerScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FDEFEF'
    },
    flatListItem:{
        padding: 5,
        marginTop: 5,
        borderColor: '#7D5A5A',
        borderWidth: 0,
        borderStyle: 'dashed',
        borderRadius: 5

    },
    modalView: {
        padding: 30,
        
    }
});
