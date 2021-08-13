import React, { useEffect, useState } from 'react';
import {View, Text, Button, StyleSheet, Modal, TouchableOpacity, TextInput} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { FlatList } from 'react-native-gesture-handler';
import {globalStyles} from '../styles/global';
import db, { streamBookings } from '../db/firestore';
import {Card} from 'react-native-shadow-cards';

const SearchScreen = ({navigation}) => {
    

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
    
    return(
        
        <View style={styles.container}>
            
            <FlatList
                data={bookings}
                renderItem={({item}) => (
                    <View  style={{
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
                    
                    <TouchableOpacity style={styles.flatListItem} onPress={() => navigation.navigate('BookingDetailsScreen', item)}>
                        <Text style={globalStyles.bodyTextDark}>Date: {item.weddingDate}</Text>
                        <Text style={globalStyles.bodyText}>Venue: {item.venueName}</Text>
                        <Text style={globalStyles.bodyText}>Name: {item.bookingName}</Text>
                        <Text style={globalStyles.bodyText}>Makeups: {item.numberOfMakeups}</Text>
                    </TouchableOpacity>
                    
                    </View>
                )}
            >
            </FlatList>
        </View>
    );
};


export default SearchScreen;

const shadowStyle={
    shadowOpacity:0.5,
    shadowRadius:20,
}

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
        borderStyle: 'solid',
        borderRadius: 10,
        

    },
    modalView: {
        padding: 30,
        
    }
});


// <Card style={{padding:0, margin: 0, width: '97%', height: '40%', alignItems: 'center', justifyContent: 'center',}}></Card>
// </Card>