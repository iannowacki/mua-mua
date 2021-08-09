import React, {useState} from 'react';
import {View, Text, Button, StyleSheet, TextInput} from 'react-native';
import { globalStyles } from '../styles/global';
import { Formik } from 'formik';
import DateTimePicker from '@react-native-community/datetimepicker';
import NewBookingForm from '../components/newBookingForm';
import addBooking from '../screens/SearchScreen';
import SearchScreen from './SearchScreen';
import Tasks from '../components/Tasks';

const NewBookingScreen = ({navigation}) => {
    
    return(
        <View style={styles.container}>
            {/* <NewBookingForm addBooking={SearchScreen.addBooking}/> */}
            <Tasks />
        </View>
    );
};

export default NewBookingScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#8fcddd'
    },
});