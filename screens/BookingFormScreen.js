import React, {useState, useEffect} from 'react';
import { TextInput, View, Button, Text, Modal, StyleSheet, ScrollView } from 'react-native';
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

    const [numberOfBrides, setNumberOfBrides] = useState(0); 
    const [numberOfMothersBridesmaids, setNumberOfMothersBridesmaids] = useState(0); 
    const [juniorBridesmaids, setJuniorBridesmaids] = useState(0); 
    
    const [bridePrice, setBridePrice] = useState(0); 
    const [bridesmaidMOBPrice, setBridesmaidMOBPrice] = useState(0); 
    const [juniorBridesmaidPrice, setJuniorBridesmaidPrice] = useState(0); 
    const [maxMakeups, setMaxMakeups] = useState(1); 
    
    

    const notAvailable = {key: 'notAvailable', color: 'red'};
    const massage = {key: 'massage', color: 'blue', selectedDotColor: 'blue'};
    const workout = {key: 'workout', color: 'green'};
    
    const [selectedDate, setSelectedDate] = useState('2021-09-23'); 

    const [button1Height, setButton1Height] = useState(40); 
    const [button2Height, setButton2Height] = useState(1); 

    const navigation = useNavigation()
    const [modalOpen, setModalOpen] = useState(false) 

    const [items, setItems] = useState({
        '2021-09-18': {dots: [notAvailable], selected: false},
    });
    const [bookings, setBookings ] = useState('')
    const validationSchema = yup.object().shape({
        name: yup.string().required(),
    })

    function bookMarkingsPopulate(){  
        const reduced = bookings.reduce((acc, currentItem) => {
            const {weddingDate, ...details} = currentItem;
            acc[weddingDate] = {...details, selected: true, selectedColor: 'red'
            };
        
            return acc;
            },{});
            setItems(reduced);
            
        };

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

            isAvailable: document.data().isAvailable,
            isBooked: document.data().isBooked,

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
            //setSelectedDate('2021-09-23')
        }
        catch(err){
            console.log(err.message)
        }
        
    }, [bookings])

    return (
        <View>
            < Formik
                initialValues={{
                    weddingDate: '', 
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
                    venueName:''}}
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
                        isAvailable: false,
                        isBooked: true,
                        createdAt: new Date().toString(),
                    }).then(result => navigation.goBack())
                      .catch(err => console.log(err))
                  }}
            >
                
                {(formikProps) => (
                    <View>
                        <View>
                {/* <Button title={'click me'} onPress={setSelectedDate('2021-09-30')} /> */}
                <View>                  
                    <View style={{height: 1}}>
                        <Text style={{fontSize:24}}>                    {selectedDate}</Text>
                        <Text style={{color:'#ffffff', fontSize: 1}}>{bridePriceText = selectedDate + '.bridePrice'}</Text>
                        <Text style={{color:'#ffffff', fontSize: 1}}>{bridesmaidMobPriceText = selectedDate + '.bridesmaidMOBPrice' }</Text>
                        <Text style={{color:'#ffffff', fontSize: 1}}>{juniorPriceText = selectedDate + '.juniorBridesmaidPrice'}</Text>
                        <Text style={{color:'#ffffff', fontSize: 1}}>{maxMakeupsText = selectedDate + '.maxMakeups' }</Text>
                        <Text style={{color:'#ffffff', fontSize: 1}}>{isAvailableText = selectedDate + '.isAvailable' }</Text>
                        <Text style={{color:'#ffffff', fontSize: 1}}>{isBookedText = selectedDate + '.isBooked' }</Text>
                        <Text style={{color:'#ffffff', fontSize: 1}}>{bookingNameText = selectedDate + '.bookingName' }</Text>
                    </View>
                    <Text style={{color:'#ffffff', fontSize: 1}}>Bride Price:      {brideValue = Object.byString(items, bridePriceText )}</Text>
                    <Text style={{color:'#ffffff', fontSize: 1}}>Maids/MOB Price:      {mobValue = Object.byString(items, bridesmaidMobPriceText )}</Text>
                    <Text style={{color:'#ffffff', fontSize: 1}}>Junior Price :      {juniorValue = Object.byString(items, juniorPriceText )}</Text>
                <Text>{console.log()}</Text>
                    <Text style={{color:'#ffffff', fontSize: 1}}>Max no. of Makeups:      {maxMakeupsValue = Object.byString(items, maxMakeupsText )}</Text>
                    <Text style={{color:'#ffffff', fontSize: 1}}>Is Booked?:      {isBookedValue = Object.byString(items, isBookedText )}</Text>
                    <Text style={{color:'#ffffff', fontSize: 1}}>Booking Name:      {bookingNameValue = Object.byString(items, bookingNameText )}</Text>
                    <Text style={{color:'#ffffff', fontSize: 1}}>{toString(isBookedValue)}</Text>
                </View>
            </View>
            
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
                        <View style={{height: button1Height, width: 370}}>
                            
                        <Button title='check' color='maroon' onPress={() => {
                            setSelectedDate(formikProps.values.weddingDate)
                            
                            setButton1Height(1)
                            setButton2Height(40)
                         }
                        }
                            />
                            </View>
                            <View style={{height: button2Height, width: 370}}>
                            <Button title='confirm check' color='maroon' onPress={() => {
                            setSelectedDate(formikProps.values.weddingDate)
                            setButton1Height(40)
                            setButton2Height(1)
                            

                            
                            if(parseInt(formikProps.values.numberOfMakeups) < 3 ){
                                alert('Sorry, minimum 4 makeups for wedding booking')

                            }
                            if(bookingNameValue){
                                alert('sorry but this date is booked, please try another')
                            }
                            
                            if(!bookingNameValue){
                                setModalOpen(true);
                            }
                            
                        }
                        }
                            />
                            </View>
                        
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

                            <Button title={'Calculate price'} onPress={() => {


                                setNumberOfBrides()
                                setNumberOfMothersBridesmaids()
                                setJuniorBridesmaids()
                                    
                                setBridePrice(parseInt(brideValue))
                                setBridesmaidMOBPrice(parseInt(mobValue))
                                setJuniorBridesmaidPrice(parseInt(juniorValue))
                                setMaxMakeups(parseInt(juniorValue))
                                console.log(juniorValue)


                                // setBridePrice(brideValueInteger)
                                // setMobPrice(mobValueInteger)
                                // setJuniorPrice(juniorValueInteger)
                            }}/>
                            <Text style={[globalStyles.bodyText, {paddingBottom: 15}]}>Booking Total Price:  £{(numberOfBrides*bridePrice)+(numberOfMothersBridesmaids*bridesmaidMOBPrice)+(juniorBridesmaids*juniorBridesmaidPrice)}</Text>
            
                            
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
