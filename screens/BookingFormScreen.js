import React from 'react';
import { TextInput, View, Button, Text } from 'react-native';
import { Formik, validateYupSchema } from 'formik';
import db from '../db/firestore';
import * as yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import { globalStyles } from '../styles/global';

const FormProps = {
    name: String
}

const CreateBooking = () => {

    const navigation = useNavigation()

    const validationSchema = yup.object().shape({
        name: yup.string().required(),
    })

    return (
        <View>
            
            
            < Formik
                initialValues={{weddingDate: '', venuePostcode: '', numberOfMakeups: ''}}
                onSubmit={(values) => {
                    db.collection('tasks').add({
                        name: values.weddingDate,
                        createdAt: new Date(),
                        completedAt: null,
                    }).then(result => navigation.goBack())
                      .catch(err => console.log(err))
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
                        {/* <Button title='sumbit' color='maroon' onPress={()=>alert("Always don't be not alert")}/> */}
                    </View>
                )}
            </Formik>
        </View>
    )
}

export default CreateBooking


