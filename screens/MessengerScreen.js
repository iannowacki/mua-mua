// import React from 'react';
// import {View, Text, Button, StyleSheet} from 'react-native';

// const MessengerScreen = ({navigation}) => {
//     return(
//         <View style={styles.container}>
//             <Text>Messenger Screen</Text>
//             <Button
//                 title="Click Here"
//                 onPress={() => alert('Button Clicked!')}
//             />
//         </View>
//     );
// };

// export default MessengerScreen;

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center',
//         backgroundColor: '#8fcddd'
//     },
// });
import React, { useEffect, useState } from 'react';
import {View, Text, Button, StyleSheet, Modal, TouchableOpacity, TextInput} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { FlatList } from 'react-native-gesture-handler';
import {globalStyles} from '../styles/global';
import db, { streamBookings } from '../db/firestore';


const MessengerScreen = ({navigation}) => {


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
            createdAt: document.data().createdAt,

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
                    <TouchableOpacity style={styles.flatListItem} onPress={() => navigation.navigate('MessageDetailsScreen', item)}>
                        <Text style={globalStyles.bodyText}>New Booking Notification! </Text>
                        <Text >{item.createdAt}</Text>
                        
                    </TouchableOpacity>
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
        backgroundColor: '#FF968A'
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
