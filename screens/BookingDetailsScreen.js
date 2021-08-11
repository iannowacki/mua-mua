import React from 'react';
import {View, Text, Button, StyleSheet, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {globalStyles} from '../styles/global';
//import CreateTask from '../components/createBookingForm';
import { Ionicons } from '@expo/vector-icons';
import db from '../db/firestore';


export default function BookingDetailsScreen  ({route, navigation}) {
    const {id, name, weddingDate, venueName, venuePostcode, bookingName, 
        numberOfMakeups, numberOfBrides,numberOfMothersBridesmaids, 
        juniorBridesmaids, bookingPrice} = route.params; 

        const bridePrice = 80;
        const mobPrice = 60;
        const juniorPrice = 40;

        React.useLayoutEffect( () => {
            navigation.setOptions({
                headerRight: () => (
                    <TouchableWithoutFeedback
                        onPress={() => {
                            db.collection('bookings')
                            .doc(id)
                            .delete()
                            .then(() => navigation.goBack())
                        }}
                        >
                            <Ionicons name={'ios-trash'}
                            size={35}
                            style={{marginRight: 25}}
                            color={'#0080ff'}
                            />

                        </TouchableWithoutFeedback>
                )
            })
        }

        )

    
        return <View style={styles.container}>
          
            <Text style={[globalStyles.bodyText, {paddingBottom: 15}]}>Wedding Date:               {weddingDate}</Text>
            <Text style={[globalStyles.bodyText, {paddingBottom: 15}]}>Venue Name:               {venueName}</Text>
            <Text style={[globalStyles.bodyText, {paddingBottom: 15}]}>Venue Postcode:               {venuePostcode}</Text>
            <Text style={[globalStyles.bodyText, {paddingBottom: 15}]}>Booking Name:           {bookingName}</Text>
            <Text style={[globalStyles.bodyText, {paddingBottom: 15}]}>Number Of Makeups:               {numberOfMakeups}</Text>
            <Text style={[globalStyles.bodyText, {paddingBottom: 15}]}>Number Of Brides:                {numberOfBrides}</Text>
            <Text style={[globalStyles.bodyText, {paddingBottom: 15}]}>MOBS/Bridesmaids:               {numberOfMothersBridesmaids}</Text>
            <Text style={[globalStyles.bodyText, {paddingBottom: 15}]}>Junior Bridesmaids:                {juniorBridesmaids}</Text>
            <Text style={[globalStyles.bodyText, {paddingBottom: 15}]}>Booking Total Price:  £{((parseInt(numberOfBrides)*bridePrice))+(parseInt(numberOfMothersBridesmaids)*mobPrice)+(parseInt(juniorBridesmaids)*juniorPrice)}</Text>
            
        </View>
    

    
};



const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#8fcddd'
    },
});