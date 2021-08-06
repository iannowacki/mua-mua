import React, {useState} from 'react';
import {View, Text, Button, StyleSheet, TextInput} from 'react-native';
import { globalStyles } from '../styles/global';
import { Formik } from 'formik';
import SearchScreen from '../screens/SearchScreen.js';
import addBooking from '../screens/SearchScreen';

export default NewBookingForm = ({addBooking}) => {
    
    return(
        <View style={styles.container}>
            < Formik
                initialValues={{weddingDate: '', venuePostcode: '', numberOfMakeups: ''}}
                onSubmit={(values) => {
                    SearchScreen.addBooking(values);
                    console.log(values);
                }}
            >
                
                {(formikProps) => (
                    <View>
                        <TextInput style={globalStyles.newBookForm} 
                        placeholder='Wedding Date'
                        onChangeText={formikProps.handleChange('weddingDate')}
                        value={formikProps.values.weddingDate}
                        >
                        </TextInput>

                        <TextInput style={globalStyles.newBookForm} 
                        placeholder='Venue Postcode'
                        onChangeText={formikProps.handleChange('venuePostcode')}
                        value={formikProps.values.venuePostcode}> 
                        </TextInput>

                        <TextInput style={globalStyles.newBookForm} 
                        placeholder='Number of makeups'
                        onChangeText={formikProps.handleChange('numberOfMakeups')}
                        value={formikProps.values.numberOfMakeups}
                        keyboardType='numeric'> 
                        </TextInput>

                        <Button title='sumbit' color='maroon' onPress={formikProps.handleSubmit}/>
                    </View>
                )}
            </Formik>
        </View>
      
    );
};



const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#8fcddd'
    },
});