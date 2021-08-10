import React, { useEffect, useState } from 'react';
import {View, Text, Button, StyleSheet, Modal, TouchableOpacity, TextInput} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { FlatList } from 'react-native-gesture-handler';
import {globalStyles} from '../styles/global';
import db, { streamTasks } from '../db/firestore';

const SearchScreen = ({navigation}) => {
    const [bookings, setBookings] = useState([
        {weddingDate: '2021-08-14', venueName: 'Brig o doon', venuePostcode: 'G81 2AZ', bookingName: 'Senga McLauchlin', numberOfMakeups: 6, numberOfBrides: 1, numberOfMothersBridesmaids: 3, juniorBridesmaids: 1, flowerGirls: 1, bookingPrice: 250, key: '2021-08-14'},
        {weddingDate: '2021-08-15', venueName: 'Lodge on the Loch', venuePostcode: 'G82 4JF', bookingName: 'Sinead Maguire', numberOfMakeups: 4, numberOfBrides: 1, numberOfMothersBridesmaids: 3, juniorBridesmaids: 0, flowerGirls: 0, bookingPrice: 250, key: '2021-08-15'},
        {weddingDate: '2021-08-18', venueName: 'Planet Hollywood', venuePostcode: 'X11 0OO', bookingName: 'Gloria Shepherd', numberOfMakeups: 4, numberOfBrides: 2, numberOfMothersBridesmaids: 2, juniorBridesmaids: 0, flowerGirls: 0, bookingPrice: 500, key: '2021-08-18'},
        {weddingDate: '2021-08-20', venueName: 'Brig o doon', venuePostcode: 'G81 2AZ', bookingName: 'Senga McLauchlin', numberOfMakeups: 6, numberOfBrides: 1, numberOfMothersBridesmaids: 3, juniorBridesmaids: 1, flowerGirls: 1, bookingPrice: 250, key: '4'},
        {weddingDate: '2021-08-23', venueName: 'Lodge on the Loch', venuePostcode: 'G82 4JF', bookingName: 'Stacey Mollock', numberOfMakeups: 4, numberOfBrides: 1, numberOfMothersBridesmaids: 3, juniorBridesmaids: 0, flowerGirls: 0, bookingPrice: 250, key: '5'},
        {weddingDate: '2021-08-24', venueName: 'Planet Hollywood', venuePostcode: 'X11 0OO', bookingName: 'Claire Thomson', numberOfMakeups: 4, numberOfBrides: 2, numberOfMothersBridesmaids: 2, juniorBridesmaids: 0, flowerGirls: 0, bookingPrice: 500, key: '6'},
        {weddingDate: '2021-08-27', venueName: 'Brig o doon', venuePostcode: 'G81 2AZ', bookingName: 'Sam Jones', numberOfMakeups: 6, numberOfBrides: 1, numberOfMothersBridesmaids: 3, juniorBridesmaids: 1, flowerGirls: 1, bookingPrice: 250, key: '7'},
        {weddingDate: '2021-08-28', venueName: 'Lodge on the Loch', venuePostcode: 'G82 4JF', bookingName: 'Mia Farley', numberOfMakeups: 4, numberOfBrides: 1, numberOfMothersBridesmaids: 3, juniorBridesmaids: 0, flowerGirls: 0, bookingPrice: 250, key: '8'},
        {weddingDate: '2021-08-29', venueName: 'Planet Hollywood', venuePostcode: 'X11 0OO', bookingName: 'Agnes Boyd', numberOfMakeups: 4, numberOfBrides: 2, numberOfMothersBridesmaids: 2, juniorBridesmaids: 0, flowerGirls: 0, bookingPrice: 500, key: '9'},
    ]);

    const addBooking = (booking) => {
        booking.key = booking.weddingDate;
        setBookings((currentBookings) => {
            return [booking, ...currentBookings];
        });
    }

    const [tasks, setTasks ] = useState()

    const mapDocToTask = (document) => {
        return {
            id: document.id,
            name: document.data().name,
            createdAt: document.data().createdAt,
            completedAt: document.data().completedAt,
        };
    };

    useEffect(() => {
        streamTasks({
            next: querySnapshot => {
                const tasks = querySnapshot
                .docs.map(docSnapshot => mapDocToTask(docSnapshot));
                setTasks(tasks);
            },
            error: (error) => console.log(error),
        });
    }, [setTasks]);
    
    return(
        <View style={styles.container}>
            <FlatList
                data={tasks}
                renderItem={({item}) => (
                    <TouchableOpacity style={styles.flatListItem} onPress={() => navigation.navigate('BookingDetailsScreen', item)}>
                        <Text style={globalStyles.bodyText}>Date: {item.weddingDate}</Text>
                        <Text style={globalStyles.bodyText}>Venue: {item.venueName}</Text>
                        <Text style={globalStyles.bodyText}>Name: {item.name}</Text>
                    </TouchableOpacity>
                )}
            >
            </FlatList>
        </View>
    );
};


export default SearchScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#8fceee'
    },
    flatListItem:{
        padding: 16,
        marginTop: 16,
        borderColor: '#ffff',
        borderWidth: 1,
        borderStyle: 'dashed',
        borderRadius: 10

    },
    modalView: {
        padding: 30,
        
    }
});