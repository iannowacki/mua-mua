import React, {useState, Component} from 'react';
import {View, Text, Button, StyleSheet, TextInput, ImageBackground} from 'react-native';
import { globalStyles } from '../styles/global';

const staticImage = require("../assets/booking-image.png");

/**
 * Landing screen for app with new booking button at top
 * 
 * @param {props} param0 navigation props
 */
const NewBookingScreen = ({navigation}) => {
    return(
        <View style={styles.container}>
            <ImageBackground source={staticImage} style={styles.ImageBackground}/>
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
    ImageBackground: {
        flex: 1,
        resizeMode: "cover",
        width: "100%",
        alignItems: "center",
      },
});