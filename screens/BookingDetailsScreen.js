import React from 'react';
import {View, Text, Button, StyleSheet, TouchableOpacity} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

export default function BookingDetailsScreen  ({route, navigation}) {
    const {weddingDate, venueName, venuePostcode, bookingName, 
        numberOfMakeups, numberOfBrides,numberOfMothersBridesmaids, 
        juniorBridesmaids, bookingPrice} = route.params; 
    
        return <View style={styles.container}>
            <Text>Wedding Date:               {weddingDate}</Text>
            <Text>Venue Name:               {venueName}</Text>
            <Text>Venue Postcode:               {venuePostcode}</Text>
            <Text>Booking Name:           {bookingName}</Text>
            <Text>Number Of Makeups:               {numberOfMakeups}</Text>
            <Text>Number Of Brides:                {numberOfBrides}</Text>
            <Text>MOBS/Bridesmaids:               {numberOfMothersBridesmaids}</Text>
            <Text>Junior Bridesmaids:                {juniorBridesmaids}</Text>
            <Text>Booking Total Price:                     {bookingPrice}</Text>
            
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