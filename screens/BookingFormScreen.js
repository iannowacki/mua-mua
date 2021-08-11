import React, {useState} from 'react';
import { TextInput, View, Button, Text, Modal, StyleSheet, ScrollView } from 'react-native';
import { Formik, validateYupSchema } from 'formik';
import db from '../db/firestore';
import * as yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import { globalStyles } from '../styles/global';
import { MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

const FormProps = {
    name: String
}

const CreateBooking = () => {

    const navigation = useNavigation()

    const [modalOpen, setModalOpen] = useState(false) 

    const validationSchema = yup.object().shape({
        name: yup.string().required(),
    })

    return (
        <View>
            
            
            < Formik
                initialValues={{weddingDate: '', 
                                venuePostcode: '', 
                                numberOfMakeups: '', 
                                name: '', 
                                bookingName:'', 
                                bookingPhone:'', 
                                bookingEmail:'', 
                                weddingTime:'',
                                numberOfBrides:'', 
                                numberOfMothersBridesmaids:'',
                                juniorBridesmaids:'',
                                bookingPrice:'',
                                venueName:'' }}
                onSubmit={(values) => {
                    db.collection('bookings').add({
                        weddingDate: values.weddingDate,
                        venuePostcode: values.venuePostcode,
                        numberOfMakeups: values.numberOfMakeups,
                        bookingName: values.bookingName,
                        bookingPhone: values.bookingPhone,
                        bookingEmail: values.bookingEmail,
                        weddingTime: values.weddingTime,
                        numberOfBrides: values.numberOfBrides,
                        numberOfMothersBridesmaids: values.numberOfMothersBridesmaids,
                        juniorBridesmaids: values.juniorBridesmaids,
                        bookingPrice: values.bookingPrice,
                        venueName: values.venueName,
                        name: values.name,
                        createdAt: new Date().toString(),
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
                        value={formikProps.values.venuePostcode}
                        >
                        </TextInput>

                        <TextInput style={globalStyles.newBookForm} 
                        placeholder='Number of makeups'
                        onChangeText={formikProps.handleChange('numberOfMakeups')}
                        value={formikProps.values.numberOfMakeups}
                        keyboardType='numeric'> 
                        </TextInput>
                        {/* <Button title='check' color='maroon' onPress={()=> setModalOpen(true)} /> */}
                        <Button title='check' color='maroon' onPress={() => {
                            if (parseInt(formikProps.values.numberOfMakeups) > 3) {
                                setModalOpen(true);
                            } else {
                            alert('Sorry, minimum 4 makeups for wedding booking');
                            } }}
                            />
                        
                        
                        {/* <Button title='sumbit' color='maroon' onPress={()=>alert("Always don't be not alert")}/> */}
                       
                        <Modal visible={modalOpen} animationType='slide' propagateSwipe={true}>
                        <ScrollView style={{padding:10}}>
                            
                            <MaterialIcons
                                name='close'
                                size={26}
                                style={styles.modalToggle}
                                onPress={() => setModalOpen(false)}
                                />
                            <View style={styles.modalStyle}>
                                <Text>It looks like your date is available! please confirm 
                                    rest of details below to complete booking</Text>
                                
                                <TextInput style={globalStyles.newBookForm} 
                                placeholder='Venue Name'
                                onChangeText={formikProps.handleChange('venueName')}
                                value={formikProps.values.venueName}
                                >
                                </TextInput>

                                <TextInput style={globalStyles.newBookForm} 
                                placeholder='Booking Name'
                                onChangeText={formikProps.handleChange('bookingName')}
                                value={formikProps.values.bookingName}
                                > 
                                </TextInput>

                                <TextInput style={globalStyles.newBookForm} 
                                placeholder='Phone Number'
                                onChangeText={formikProps.handleChange('bookingPhone')}
                                value={formikProps.values.bookingPhone}
                                keyboardType='numeric'> 
                                </TextInput>

                                <TextInput style={globalStyles.newBookForm} 
                                placeholder='Email'
                                onChangeText={formikProps.handleChange('bookingEmail')}
                                value={formikProps.values.bookingEmail}>                    
                                </TextInput>

                                <TextInput style={globalStyles.newBookForm} 
                                placeholder='Ceremony time'
                                onChangeText={formikProps.handleChange('weddingTime')}
                                value={formikProps.values.weddingTime}>                    
                                </TextInput>


                                <TextInput style={globalStyles.newBookForm} 
                                placeholder='Number of brides (max 2)'
                                onChangeText={formikProps.handleChange('numberOfBrides')}
                                value={formikProps.values.numberOfBrides}>                    
                                </TextInput>

                                <TextInput style={globalStyles.newBookForm} 
                                placeholder='Bridesmaids / M.O.Bs'
                                onChangeText={formikProps.handleChange('numberOfMothersBridesmaids')}
                                value={formikProps.values.numberOfMothersBridesmaids}>                    
                                </TextInput>

                                <TextInput style={globalStyles.newBookForm} 
                                placeholder='Junior bridesmaids (u14)'
                                onChangeText={formikProps.handleChange('juniorBridesmaids')}
                                value={formikProps.values.juniorBridesmaids}>                    
                                </TextInput>

                                <Button title='sumbit' color='maroon' onPress={formikProps.handleSubmit}/>
                            </View>
                            
                        </ScrollView>
                        </Modal>
                        
                        
                        
                    </View>
                )}
            </Formik>
        </View>
    )
}

export default CreateBooking

const styles = StyleSheet.create({
    modalStyle:{
        padding: 20,
        paddingTop: 40,
    },
    modalToggle:{
        marginBottom: 6,
        marginTop: 40,
        marginRight: 5,
        borderWidth: 2,
        borderColor: 'maroon',
        color: 'maroon',
        padding: 6,
        borderRadius: 4,
        alignSelf: 'flex-end',
    }
})
