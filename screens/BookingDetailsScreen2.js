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

const CreateTask = () => {

    const navigation = useNavigation()

    const validationSchema = yup.object().shape({
        name: yup.string().required(),
    })

    return (
        <View>
            
            {/* <Formik 
              initialValues={{name: ''}}
              onSubmit={(values) => {
                db.collection('tasks').add({
                    name: values.name,
                    createdAt: new Date(),
                    completedAt: null,
                }).then(result => navigation.navigate('BookingDetailsScreen'))
                  .catch(err => console.log(err))
              }}
              validationSchema={validationSchema}
            >
                {({
                    values, 
                    handleChange, 
                    errors,
                    handleSubmit}) => {
                    <View>
                        <TextInput
                        onChangeText={handleChange('name')}
                        placeholder={'Describe Task'}
                        value={values.name}
                        autoFocus={true} />
                        { errors['name'] ? <Text>{errors['name']}</Text> : null }
                        <Button title={'Create'} onPress ={()=> handleSubmit()} />
                    </View>
                }

                }
            </Formik> */}
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

export default CreateTask


// import React from 'react';
// import {View, Text, Button, StyleSheet, TouchableOpacity} from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import {globalStyles} from '../styles/global';
// import CreateTask from '../components/createBookingForm';

// export default function BookingDetailsScreen2  ({route, navigation}) {
//     const {weddingDate, venueName, venuePostcode, bookingName, 
//         numberOfMakeups, numberOfBrides,numberOfMothersBridesmaids, 
//         juniorBridesmaids, bookingPrice} = route.params; 
    
//         return <View style={styles.container}>
//             <Text style={[globalStyles.bodyText, {paddingBottom: 15}]}>Wedding Date:               {weddingDate}</Text>
//             <Text style={[globalStyles.bodyText, {paddingBottom: 15}]}>Venue Name:               {venueName}</Text>
//             <Text style={[globalStyles.bodyText, {paddingBottom: 15}]}>Venue Postcode:               {venuePostcode}</Text>
//             <Text style={[globalStyles.bodyText, {paddingBottom: 15}]}>Booking Name:           {bookingName}</Text>
//             <Text style={[globalStyles.bodyText, {paddingBottom: 15}]}>Number Of Makeups:               {numberOfMakeups}</Text>
//             <Text style={[globalStyles.bodyText, {paddingBottom: 15}]}>Number Of Brides:                {numberOfBrides}</Text>
//             <Text style={[globalStyles.bodyText, {paddingBottom: 15}]}>MOBS/Bridesmaids:               {numberOfMothersBridesmaids}</Text>
//             <Text style={[globalStyles.bodyText, {paddingBottom: 15}]}>Junior Bridesmaids:                {juniorBridesmaids}</Text>
//             <Text style={[globalStyles.bodyText, {paddingBottom: 15}]}>Booking Total Price:                     {bookingPrice}</Text>
            
//         </View>
    

    
// };



// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center',
//         backgroundColor: '#8fcddd'
//     },
// });