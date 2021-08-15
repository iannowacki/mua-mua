import React, {useState, useEffect} from 'react';
import { TextInput, View, Button, Text, Modal, StyleSheet, ScrollView, FlatList, TouchableWithoutFeedback } from 'react-native';
import { Formik, validateYupSchema } from 'formik';
import db, {streamBookings} from '../db/firestore';
import * as yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import { globalStyles } from '../styles/global';
import { MaterialIcons } from '@expo/vector-icons';

/**
 * Function to parse our particular shape of data structure associated with the calendar 
 * 
 * @param {object} o  object being parsed
 * @param {string} s  string reference whe are
 */
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

/**
 * Screen for viewing and updating prices
 */
const CreateBooking = () => {

    /**
     * Function to transform objects from one shape to another as 'items' above
     */
    function bookMarkingsPopulate(){  
        const reduced = bookings.reduce((acc, currentItem) => {
            const {weddingDate, ...details} = currentItem;
            acc[weddingDate] = {...details, selected: true, selectedColor: 'red'
            };
        
            return acc;
            },{});
            setItems(reduced);
            
        };
    
    /**
     * Data structure where date is key and value are the rest of the fields. used to obtain data to calculate price
     */
    const [bookings, setBookings ] = useState('')
    const [items, setItems] = useState({
        '2021-09-18': {dots: [notAvailable], selected: false},
    });

     /**
     * Function to map data incoming from database to our local 'bookings' variable
     * 
     * @param {object} document incoming structure from firestore.
     */
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
        };
    };
    
    /**
    * Function streamBookings is used to stream data from database.
    */
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

    /**
     * User settings are currently store as a 'booking' on 2021-09-23. 
     * This function listens for bookings variable being updated from db
     * then sets settings date for data to be read from
     * 
     */
    useEffect(()=>{
        try{
            bookMarkingsPopulate();
            setSelectedDate('2021-09-23')
        }
        catch(err){
            console.log(err.message)
        }
        
    }, [bookings])

    // Calendar marked dates
    const notAvailable = {key: 'notAvailable', color: 'red'};
    const massage = {key: 'massage', color: 'blue', selectedDotColor: 'blue'};
    const workout = {key: 'workout', color: 'green'};
    

    const [selectedDate, setSelectedDate] = useState(''); 

    // navigation variables
    const navigation = useNavigation()
    const [modalOpen, setModalOpen] = useState(false) 

    // Validation schema for yup
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
                <View style={{height: 1}}>
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

                                    padding: 10,
                                    margin:20,
                                }}>

                    <ScrollView style={{padding:20}}>
                        <View style={{flexDirection: 'row'}}>
                            <View style={{flex: 3}}>
                            </View>
                            <View style={{flex: 1}}>
                                <MaterialIcons
                                    name='close'
                                    size={26}
                                    style={globalStyles.modalToggle}
                                    onPress={() => setModalOpen(false)}
                                />
                            </View>
                        </View >
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
                            <Text></Text>
                            <TextInput style={globalStyles.newBookForm} 
                            placeholder='Min makeups per booking'
                            onChangeText={formikProps.handleChange('maxMakeups')}
                            value={formikProps.values.maxMakeups}
                            keyboardType='numeric'
                            >
                            </TextInput>
                            <Text></Text>
                            <TextInput style={globalStyles.newBookForm} 
                            placeholder='Price for bride'
                            onChangeText={formikProps.handleChange('bridePrice')}
                            value={formikProps.values.bridePrice}
                            keyboardType='numeric'
                            > 
                            </TextInput>
                            <Text></Text>
                            <TextInput style={globalStyles.newBookForm} 
                            placeholder='Bridesmaid/MOB price'
                            onChangeText={formikProps.handleChange('bridesmaidMOBPrice')}
                            value={formikProps.values.bridesmaidMOBPrice}
                            keyboardType='numeric'
                            > 
                            </TextInput>
                            <Text></Text>
                            <TextInput style={globalStyles.newBookForm} 
                            placeholder='Price for junior bridesmaid'
                            onChangeText={formikProps.handleChange('juniorBridesmaidPrice')}
                            value={formikProps.values.juniorBridesmaidPrice}
                            keyboardType='numeric'
                            > 
                            </TextInput>
                            <Text></Text>
                            <Text></Text>
                            <Button title='Confirm Update Settings' color='maroon' onPress={()=>{
                                if(formikProps.values.maxMiles === ''){
                                    alert('please enter max miles')
                                }
                                else if(formikProps.values.maxMakeups === ''){
                                    alert('please enter minimum makeups per booking')
                                }
                                else if(formikProps.values.bridePrice === ''){
                                    alert('please enter price for brides makeup')
                                }
                                else if(formikProps.values.bridesmaidMOBPrice === ''){
                                    alert('please enter price for bridesmaids/MOBs')
                                }
                                else if(formikProps.values.juniorBridesmaidPrice === ''){
                                    alert('please enter price for junior bridesmaid')
                                }
                                else{
                                formikProps.handleSubmit();
                                // formikProps.values.maxMakeups = '';
                                // formikProps.values.maxMiles = '';
                                // formikProps.values.bridePrice = '';
                                // formikProps.values.bridesmaidMOBPrice = '';
                                // formikProps.values.juniorBridesmaidPrice = '';
                                }}}
                                />
                                <Text></Text>
                                <Text></Text>
                                <Text></Text>
                        </ScrollView>
                    </View>
                </View>
                </Modal>
                    <Button title='Click here to update Settings' color='maroon' onPress={()=> {
                        
                         setModalOpen(true)
                        }
                        
                        
                        }/>
                        
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
