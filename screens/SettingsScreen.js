import React, {useState, useEffect} from 'react';
import { TextInput, View, Button, Text, Modal, StyleSheet, ScrollView } from 'react-native';
import { Formik, validateYupSchema } from 'formik';
import db, {streamBookings} from '../db/firestore';
import * as yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import { globalStyles } from '../styles/global';
import { MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

const FormProps = {
    name: String
}

const CreateBooking = () => {

    

    // const [bookings, setBookings ] = useState('')

    // const mapDocToBooking = (document) => {
    //     return {
    //         id: document.id,
    //         name: document.data().name,
    //         createdAt: document.data().createdAt,
    //         weddingDate: document.data().weddingDate,
    //         venueName: document.data().venueName,
    //         numberOfMakeups: document.data().numberOfMakeups,
    //         bookingName: document.data().bookingName,
    //         venuePostcode: document.data().venuePostcode,
    //         numberOfBrides: document.data().numberOfBrides,
    //         numberOfMothersBridesmaids : document.data().numberOfMothersBridesmaids,
    //         juniorBridesmaids: document.data().juniorBridesmaids,

    //     };
    // };

    // useEffect(() => {
    //     const unsubscribe = streamBookings({
    //         next: querySnapshot => {
    //             const bookings = querySnapshot
    //             .docs.map(docSnapshot => mapDocToBooking(docSnapshot));
    //             setBookings(bookings);
    //         },
    //         error: (error) => console.log(error),
    //     });
    //     return unsubscribe
    // }, [setBookings]);
    


    const navigation = useNavigation()

    const [modalOpen, setModalOpen] = useState(false) 

    const validationSchema = yup.object().shape({
        name: yup.string().required(),
    })

    return (
        <View>
            
            <Text>        Current Settings:</Text>
    <Text></Text>
            <Text></Text>
            <Text></Text>
            <Text></Text>
            <Text></Text>
            
            < Formik
                initialValues={{maxMakeups:'', 
                                maxMiles:'', 
                                bridePrice:'', 
                                bridesmaidMOBPrice:'',
                                juniorBridesmaidPrice:'',
                                name: '', 
                                }}
                onSubmit={(values) => {
                    db.collection('bookings').doc('settingsDocument').set({
                        id: 'userSettings',
                        juniorBridesmaidPrice: values.juniorBridesmaidPrice,
                        bridesmaidMOBPrice: values.bridesmaidMOBPrice,
                        bridePrice: values.bridePrice,
                        maxMiles: values.maxMiles,
                        maxMakeups: values.maxMakeups,
                        //name: values.name,
                        createdAt: new Date(),
                    })
                    .then(setModalOpen(false))
                      .catch(err => console.log(err))
                  }}
            >
                
                {(formikProps) => (
                    <View>
                        <Modal visible={modalOpen} animationType='slide'>

                        <ScrollView style={{padding:30}}>
                            <MaterialIcons
                            name='close'
                            size={26}
                            style={globalStyles.modalToggle}
                            onPress={() => setModalOpen(false)}
                            />
                        <TextInput style={globalStyles.newBookForm} 
                        placeholder='Max miles travel'
                        onChangeText={formikProps.handleChange('maxMiles')}
                        value={formikProps.values.maxMiles}
                        >
                        </TextInput>

                        <TextInput style={globalStyles.newBookForm} 
                        placeholder='Max makeups per booking'
                        onChangeText={formikProps.handleChange('maxMakeups')}
                        value={formikProps.values.maxMakeups}
                        >
                        </TextInput>

                        <TextInput style={globalStyles.newBookForm} 
                        placeholder='Price for bride'
                        onChangeText={formikProps.handleChange('bridePrice')}
                        value={formikProps.values.bridePrice}
                        > 
                        </TextInput>

                        <TextInput style={globalStyles.newBookForm} 
                        placeholder='Bridesmaid/MOB price'
                        onChangeText={formikProps.handleChange('bridesmaidMOBPrice')}
                        value={formikProps.values.bridesmaidMOBPrice}
                        > 
                        </TextInput>

                        <TextInput style={globalStyles.newBookForm} 
                        placeholder='Price for junior bridesmaid'
                        onChangeText={formikProps.handleChange('juniorBridesmaidPrice')}
                        value={formikProps.values.juniorBridesmaidPrice}
                        > 
                        </TextInput>

                        <Button title='Confirm Update Settings' color='maroon' onPress={formikProps.handleSubmit}/>
                            
                            
                        </ScrollView>
                        </Modal>
                        
                        
                        <Button title='Update Settings' color='maroon' onPress={()=> setModalOpen(true)} />
                        
                        
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
        borderWidth: 2,
        borderColor: 'maroon',
        color: 'maroon',
        padding: 12,
        borderRadius: 4,
        alignSelf: 'center',
    }
})
