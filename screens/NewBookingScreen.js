import React, {useState, Component} from 'react';
import {View, Text, Button, StyleSheet, TextInput, ImageBackground} from 'react-native';
import { globalStyles } from '../styles/global';

//const backgroundImage = require("../assets/bookin-image.png");
const staticImage = require("../assets/booking-image.png");

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