import React, {useState} from 'react';
import {View, Text, Button, StyleSheet, TextInput} from 'react-native';
import { globalStyles } from '../styles/global';


const NewBookingScreen = ({navigation}) => {
    
    return(
        <View style={styles.container}>
            <Text>Click up there to start a new booking!</Text>
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