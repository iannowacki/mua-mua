import React, {useState, useEffect} from 'react';
import { TextInput, View, Button, Text, Modal, StyleSheet, ScrollView, FlatList, TouchableWithoutFeedback } from 'react-native';
import { Formik, validateYupSchema } from 'formik';
import db, {streamBookings} from '../db/firestore';

import * as yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import { globalStyles } from '../styles/global';
import { MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

Object.byString = function(o, s) {
    s = s.replace(/\[(\w+)\]/g, '.$1'); 
    s = s.replace(/^\./, '');           
    var a = s.split('.');
    for (var i = 0, n = a.length; i < n; ++i) {
        var k = a[i];
        if (k in o) {
            o = o[k];
        } else {
            return;
        }
    }
    return o;
}



const FormProps = {
    name: String
}

const CreateBooking = () => {
    function bookMarkingsPopulate(){  
        const reduced = bookings.reduce((acc, currentItem) => {
            const {weddingDate, ...details} = currentItem;
            acc[weddingDate] = {...details, selected: true, selectedColor: 'red'
            };
        
            return acc;
            },{});
            setItems(reduced);
            
        };
    

    const [bookings, setBookings ] = useState('')
    const [items, setItems] = useState({
        // '2021-09-04': [{}],
        // '2021-09-11': [{}],
        '2021-09-18': {dots: [notAvailable], selected: false},
     
    });

    const mapDocToBooking = (document) => {
        return {
            id: document.id,
            name: document.data().name,
            createdAt: document.data().createdAt,
            weddingDate: document.data().weddingDate,
            venueName: document.data().venueName,
            numberOfMakeups: document.data().numberOfMakeups,
            bookingName: document.data().bookingName,
            venuePostcode: document.data().venuePostcode,
            numberOfBrides: document.data().numberOfBrides,
            numberOfMothersBridesmaids : document.data().numberOfMothersBridesmaids,
            juniorBridesmaids: document.data().juniorBridesmaids,

            juniorBridesmaidPrice: document.data().juniorBridesmaidPrice,
            bridesmaidMOBPrice: document.data().bridesmaidMOBPrice,
            bridePrice: document.data().bridePrice,
            maxMiles: document.data().maxMiles,
            maxMakeups: document.data().maxMakeups,

            // isAvailable: document.date().isAvailable,


        };
    };
    
    useEffect(() => {
        const unsubscribe = streamBookings({
            next: querySnapshot => {
                const bookings = querySnapshot
                .docs.map(docSnapshot => mapDocToBooking(docSnapshot));
                setBookings(bookings);
            },
            error: (error) => console.log(error),
        });
        return unsubscribe
    }, [setBookings]);

    useEffect(()=>{
       
        try{
            bookMarkingsPopulate();
            setSelectedDate('2021-09-23')
        }
        catch(err){
            console.log(err.message)
        }
        
    }, [bookings])
    // const settingsFile = {};
    
    // const search = (nameKey, bookings) => {
    //     for (let i=0; i < bookings.length; i++) {
    //         if (bookings[i].id == nameKey) {
    //             settingsFile = bookings[i];
    //             return myArray[i];
    //         }
    //     }
    // }


    const notAvailable = {key: 'notAvailable', color: 'red'};
    const massage = {key: 'massage', color: 'blue', selectedDotColor: 'blue'};
    const workout = {key: 'workout', color: 'green'};
    
    const [selectedDate, setSelectedDate] = useState(''); 

    const navigation = useNavigation()

    const [modalOpen, setModalOpen] = useState(false) 

    const validationSchema = yup.object().shape({
        name: yup.string().required(),
    })

    return (
        <View style={{backgroundColor: '#FDEFEF', flex: 1, alignContent: 'center', }}>
        <View  style={{
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
            
          }}>
            
            
            
            
           
            <   View style={{height: 1}}>
                    <Text style={{color:'#ffffff', fontSize: 1}}>{bridePriceText = selectedDate + '.bridePrice'}</Text>
                    <Text style={{color:'#ffffff', fontSize: 1}}>{bridesmaidMobPriceText = selectedDate + '.bridesmaidMOBPrice' }</Text>
                    <Text style={{color:'#ffffff', fontSize: 1}}>{juniorPriceText = selectedDate + '.juniorBridesmaidPrice'}</Text>
                    <Text style={{color:'#ffffff', fontSize: 1}}>{maxMakeupsText = selectedDate + '.maxMakeups' }</Text>
                </View>
                <View >
                    
                    <Text></Text>
                    <Text style={{fontWeight:'400', fontSize:25, textAlign:'center', textDecorationLine:'underline'}}>My Current Settings</Text>  
                    <Text></Text>
                    <Text></Text>
                    
                    <Text></Text>
                    <Text style={{fontWeight:'bold', fontSize:25, textAlign:'center'}}>Bride Price:</Text>
                    <Text style={{fontWeight:'300', fontSize:20, textAlign:'center'}}>£{Object.byString(items, bridePriceText )}</Text>
                    <Text></Text>
                    <Text style={{fontWeight:'bold', fontSize:25, textAlign:'center'}}>Maids/MOB Price: </Text>
                    <Text style={{fontWeight:'300', fontSize:20, textAlign:'center'}}>£{Object.byString(items, bridesmaidMobPriceText )}</Text>
                    <Text></Text>
                    <Text style={{fontWeight:'bold', fontSize:25, textAlign:'center'}}>Junior Price : </Text>
                    <Text style={{fontWeight:'300', fontSize:20, textAlign:'center'}}>£{Object.byString(items, juniorPriceText )}</Text>
                    <Text></Text>
                    <Text style={{fontWeight:'bold', fontSize:25, textAlign:'center'}}>Minimum Makeups:  </Text>
                    <Text style={{fontWeight:'300', fontSize:20, textAlign:'center'}}>{Object.byString(items, maxMakeupsText )}</Text>
                    <Text></Text>
                    <Text></Text>
                    <Text></Text>
                </View>
            < Formik
                initialValues={{maxMakeups:'', 
                                maxMiles:'', 
                                bridePrice:'', 
                                bridesmaidMOBPrice:'',
                                juniorBridesmaidPrice:'',
                                name: '', 
                                }}
                onSubmit={(values) => {
                    db.collection('bookings').doc('hBJWmd4bnppoxmL5WsS7').set({
                        id: 'hBJWmd4bnppoxmL5WsS7',
                        juniorBridesmaidPrice: values.juniorBridesmaidPrice,
                        bridesmaidMOBPrice: values.bridesmaidMOBPrice,
                        bridePrice: values.bridePrice,
                        maxMiles: values.maxMiles,
                        maxMakeups: values.maxMakeups,
                        name: values.name,
                        createdAt: new Date().toString(),

                        bookingEmail: 'settings@settingsfile.com',
                        bookingName: 'Celine Odonell',
                        bookingPhone: '53771465',
                        bookingPrice: 'Arm and a Leg',
                        juniorBridesmaids: '1',
                        numberOfBrides: '1',
                        numberOfMakeups: '1',
                        numberOfMothersBridesmaids: '1',
                        venueName: 'Airport Hilton',
                        venuePostcode: 'SE77 1NG',
                        weddingDate: '2021-09-23',
                        weddingTime: '12:00',

                        isAvailable: false,
                        isBooked: true,



                    })
                    .then(setModalOpen(false))
                      .catch(err => console.log(err))
                  }}
            >
                
                {(formikProps) => (
                    <View>
                        <Modal style={{backgroundColor: '#FDEFEF'}} visible={modalOpen} animationType='slide'>
                            
                            <View style={{backgroundColor: '#FDEFEF', flex: 1, alignContent: 'center', }}>
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
                                    
                                }}>

                        <ScrollView style={{padding:30}}>
                        <View style={{flexDirection: 'row'}}>
                    <View style={{flex: 3}}></View>
                    <View style={{flex: 1}}>
                        <MaterialIcons
                            name='close'
                            size={26}
                            style={globalStyles.modalToggle}
                            onPress={() => setModalOpen(false)}
                            />
                    </View>
                </View>
                <Text></Text>
                        <Text style={{fontWeight:'bold', fontSize:18, textAlign:'center'}}>Update your current settings here</Text>

                                <Text></Text>
                                <Text></Text>
                        <TextInput style={globalStyles.newBookForm} 
                        placeholder='Max miles travel'
                        onChangeText={formikProps.handleChange('maxMiles')}
                        value={formikProps.values.maxMiles}
                        keyboardType='numeric'
                        >
                        </TextInput>

                        <TextInput style={globalStyles.newBookForm} 
                        placeholder='Min makeups per booking'
                        onChangeText={formikProps.handleChange('maxMakeups')}
                        value={formikProps.values.maxMakeups}
                        keyboardType='numeric'
                        >
                        </TextInput>

                        <TextInput style={globalStyles.newBookForm} 
                        placeholder='Price for bride'
                        onChangeText={formikProps.handleChange('bridePrice')}
                        value={formikProps.values.bridePrice}
                        keyboardType='numeric'
                        > 
                        </TextInput>

                        <TextInput style={globalStyles.newBookForm} 
                        placeholder='Bridesmaid/MOB price'
                        onChangeText={formikProps.handleChange('bridesmaidMOBPrice')}
                        value={formikProps.values.bridesmaidMOBPrice}
                        keyboardType='numeric'
                        > 
                        </TextInput>

                        <TextInput style={globalStyles.newBookForm} 
                        placeholder='Price for junior bridesmaid'
                        onChangeText={formikProps.handleChange('juniorBridesmaidPrice')}
                        value={formikProps.values.juniorBridesmaidPrice}
                        keyboardType='numeric'
                        > 
                        </TextInput>
                        <Text></Text>

                        
                        <Text></Text>

                        <Button title='Confirm Update Settings' color='maroon' onPress={
                        
                            formikProps.handleSubmit}/>

                    
                            
                            
                        </ScrollView>
                        </View>
                        </View>
                        </Modal>
    
                      
                        <Button title='Click here to update Settings' color='maroon' onPress={()=> setModalOpen(true)} />
                      
                       
                        
                    </View>
                )}
            </Formik>
            </View>
        
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
