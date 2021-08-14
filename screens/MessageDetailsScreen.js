import React from 'react';
import {View, Text, Button, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, ScrollView} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {globalStyles} from '../styles/global';
//import CreateTask from '../components/createBookingForm';
import { Ionicons } from '@expo/vector-icons';
import db from '../db/firestore';


export default function MessageDetailsScreen  ({route, navigation}) {
    const {id, name, weddingDate, venueName, venuePostcode, bookingName, 
        numberOfMakeups, numberOfBrides,numberOfMothersBridesmaids, 
        juniorBridesmaids, bookingPrice, createdAt, bookingEmail} = route.params; 
        
     /**
      * Function for record delete handling
      */   
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
        return <ScrollView >
                    <View>
                    <View style={{padding: 20, backgroundColor:'#FDEFEF'}}>
                    <Text style={{fontWeight:'300', fontSize:20, textAlign:'left', color: 'grey'}}>From:</Text>
                    <Text style={{fontWeight:'bold', fontSize:30, textAlign:'left'}}>{bookingName}</Text>
                    <Text style={{fontWeight:'400', fontSize:15, textAlign:'left'}}>{bookingEmail}</Text>
                    <Text></Text>
                    <Text style={{fontWeight:'300', fontSize:20, textAlign:'left', color: 'grey'}}>Time:</Text>
                    <Text style={{fontWeight:'400', fontSize:15, textAlign:'left'}}>{createdAt}</Text>
                    <Text></Text>
                    <Text style={{fontWeight:'300', fontSize:20, textAlign:'left', color: 'grey'}}>Subject:</Text>
                    <Text style={{fontWeight:'400', fontSize:15, textAlign:'left'}}>New booking notification</Text>
                    <Text></Text>
                    <Text></Text>
                    <Text style={{fontWeight:'300', fontSize:20, textAlign:'left', color: 'grey'}}>Message:</Text>
                    <Text style={{fontWeight:'400', fontSize:15, textAlign:'left'}}>Congratulations, you have been booked for the {weddingDate} at {venueName}. You can view details of this booking below and you can also see it in your calendar.</Text>
                    </View>
                    <View style={{backgroundColor: '#FDEFEF'}}>
                    <View style={{
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
                        padding: 20,
                        margin: 20,
                    }}
                    >
                        <Text style={{fontWeight:'bold', fontSize:18, textAlign:'center'}}>Wedding Date:</Text>
                        <Text style={{fontWeight:'300', fontSize:15, textAlign:'center'}}>{weddingDate}</Text>
                        <Text></Text>
                        <Text style={{fontWeight:'bold', fontSize:18, textAlign:'center'}}>Venue Name:</Text>
                        <Text style={{fontWeight:'300', fontSize:15, textAlign:'center'}}> {venueName}</Text>
                        <Text></Text>
                        <Text style={{fontWeight:'bold', fontSize:18, textAlign:'center'}}>Venue Postcode:</Text>
                        <Text style={{fontWeight:'300', fontSize:15, textAlign:'center'}}>{venuePostcode}</Text>
                        <Text></Text>
                        <Text style={{fontWeight:'bold', fontSize:18, textAlign:'center'}}>Booking Name:</Text>
                        <Text style={{fontWeight:'300', fontSize:15, textAlign:'center'}}>{bookingName}</Text>
                        <Text></Text>
                        <Text style={{fontWeight:'bold', fontSize:18, textAlign:'center'}}>Number Of Makeups:</Text>
                        <Text style={{fontWeight:'300', fontSize:15, textAlign:'center'}}>{numberOfMakeups}</Text>
                        <Text></Text>
                        <Text style={{fontWeight:'bold', fontSize:18, textAlign:'center'}}>Number Of Brides:</Text>
                        <Text style={{fontWeight:'300', fontSize:15, textAlign:'center'}}>{numberOfBrides}</Text>
                        <Text></Text>
                        <Text style={{fontWeight:'bold', fontSize:18, textAlign:'center'}}>MOBS/Bridesmaids: </Text>
                        <Text style={{fontWeight:'300', fontSize:15, textAlign:'center'}}>{numberOfMothersBridesmaids}</Text>
                        <Text></Text>
                        <Text style={{fontWeight:'bold', fontSize:18, textAlign:'center'}}>Junior Bridesmaids:</Text>
                        <Text style={{fontWeight:'300', fontSize:15, textAlign:'center'}}>{juniorBridesmaids}</Text>
                    </View>
                </View>
            </View>
        </ScrollView>
};



const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
        backgroundColor: '#FDEFEF'
    },
});