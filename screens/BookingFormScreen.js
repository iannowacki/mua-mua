import React, {useState, useEffect} from 'react';
import { TextInput, View, Button, Text, Modal, StyleSheet, ScrollView } from 'react-native';
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
 * Screen to create new booking with part input form with other part on modal
 */

const CreateBooking = () => {
   
    

    // Variables for data used to calculate prices and operate booking validation in booking form
    const [numberOfBrides, setNumberOfBrides] = useState(0); 
    const [numberOfMothersBridesmaids, setNumberOfMothersBridesmaids] = useState(0); 
    const [juniorBridesmaids, setJuniorBridesmaids] = useState(0); 
    const [bridePrice, setBridePrice] = useState(0); 
    const [bridesmaidMOBPrice, setBridesmaidMOBPrice] = useState(0); 
    const [juniorBridesmaidPrice, setJuniorBridesmaidPrice] = useState(0); 
    const [maxMakeups, setMaxMakeups] = useState(1); 
    const [numberOfMakeups, setNumberOfMakeups] = useState(0); 
    const [calculatedPrice, setCalculatedPrice ] = useState(0);
    const [postcode, setPostcode] = useState('');
    const [testPostcode, setTestPostcode] = useState('G81 1AA')

    useEffect(()=>{
        console.log('postcode use effect change on postcode :' + postcode)
        
    }, [postcode])
    
    
    
    // Dates details
    const notAvailable = {key: 'notAvailable', color: 'red'};
    const massage = {key: 'massage', color: 'blue', selectedDotColor: 'blue'};
    const workout = {key: 'workout', color: 'green'};
    
    // variable that holds currently focused date
    const [selectedDate, setSelectedDate] = useState('2021-09-23'); 

    // Variables to control height of buttons so only one is visible at a time (doesnt seem to work on android)
    const [button1Height, setButton1Height] = useState(40); 
    const [button2Height, setButton2Height] = useState(1); 
    
    // Variables relating to navigation and modal
    const navigation = useNavigation()
    const [modalOpen, setModalOpen] = useState(false) 

    /**
     * Data structure where date is key and value are the rest of the fields. used to obtain data to calculate price
     */
    const [items, setItems] = useState({
        '2021-09-18': {dots: [notAvailable], selected: false},
    });
    const [bookings, setBookings ] = useState('')

    // Validation schema form booking form
    const validationSchema = yup.object().shape({
        name: yup.string().required(),
    })
    
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

            isAvailable: document.data().isAvailable,
            isBooked: document.data().isBooked,
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
        }
        catch(err){
            console.log(err.message)
        }
    }, [bookings])

    /**
     * Sets values to be used in price calculation (once items container has been updated)
     */
    useEffect(() =>{
        setBridePrice(brideValueInteger)
        setBridesmaidMOBPrice(mobValueInteger)
        setJuniorBridesmaidPrice(juniorValueInteger)
        setMaxMakeups(maxMakeupsInteger);
    }, [items])

   

    return (
        <View style={{backgroundColor: '#FDEFEF', flex: 1, justifyContent: 'center'}} >
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
                <View style={{marginBottom: '10%',}}>
                    <View >
                        <View style={{backgroundColor: '#FDEFEF'}}>                  
                            <View style={{height: 1}}>
                                <Text style={{color:'#ffffff', fontSize: 1}}>{bridePriceText = selectedDate + '.bridePrice'}</Text>
                                <Text style={{color:'#ffffff', fontSize: 1}}>{bridesmaidMobPriceText = selectedDate + '.bridesmaidMOBPrice' }</Text>
                                <Text style={{color:'#ffffff', fontSize: 1}}>{juniorPriceText = selectedDate + '.juniorBridesmaidPrice'}</Text>
                                <Text style={{color:'#ffffff', fontSize: 1}}>{maxMakeupsText = selectedDate + '.maxMakeups' }</Text>
                                <Text style={{color:'#ffffff', fontSize: 1}}>{isAvailableText = selectedDate + '.isAvailable' }</Text>
                                <Text style={{color:'#ffffff', fontSize: 1}}>{isBookedText = selectedDate + '.isBooked' }</Text>
                                <Text style={{color:'#ffffff', fontSize: 1}}>{bookingNameText = selectedDate + '.bookingName' }</Text>
                                <Text style={{color:'#ffffff', fontSize: 1}}>Bride Price:      {brideValue = Object.byString(items, bridePriceText )}</Text>
                                <Text style={{color:'#ffffff', fontSize: 1}}>Maids/MOB Price:      {mobValue = Object.byString(items, bridesmaidMobPriceText )}</Text>
                                <Text style={{color:'#ffffff', fontSize: 1}}>Junior Price :      {juniorValue = Object.byString(items, juniorPriceText )}</Text>
                                <Text style={{color:'#ffffff', fontSize: 1}}>Max no. of Makeups:      {maxMakeupsValue = Object.byString(items, maxMakeupsText )}</Text>
                                <Text style={{color:'#ffffff', fontSize: 1}}>Is Booked?:      {isBookedValue = Object.byString(items, isBookedText )}</Text>
                                <Text style={{color:'#ffffff', fontSize: 1}}>Booking Name:      {bookingNameValue = Object.byString(items, bookingNameText )}</Text>
                                <Text style={{color:'#ffffff', fontSize: 1}}>{toString(isBookedValue)}</Text>
                            </View>
                        </View>
                    </View>
                        
                    <Text style={{fontWeight:'500', fontSize:25, textAlign:'center', padding: 20}}>Enter your details below to check for availability</Text>
                    <TextInput style={globalStyles.newBookForm} 
                    placeholder='Wedding Date'
                    onChangeText={formikProps.handleChange('weddingDate')}
                    value={formikProps.values.weddingDate}
                    >
                    </TextInput>
                    <Text></Text>
                    <TextInput style={globalStyles.newBookForm} 
                    placeholder='Venue Postcode'
                    onChangeText={formikProps.handleChange('venuePostcode')}
                    value={formikProps.values.venuePostcode}
                    >
                    </TextInput>
                    <Text></Text>
                    <TextInput style={globalStyles.newBookForm} 
                    placeholder='Number of makeups'
                    onChangeText={formikProps.handleChange('numberOfMakeups')}
                    value={formikProps.values.numberOfMakeups}
                    keyboardType='numeric'> 
                    </TextInput>
                    <Text></Text>
                    <View style={{height: button1Height}}>
                        
                    <Button title='check' color='maroon' onPress={() => {
                        setSelectedDate(formikProps.values.weddingDate)
                        setButton1Height(1)
                        setButton2Height(40)
                        setNumberOfMakeups(formikProps.values.numberOfMakeups)
                        }
                    }
                    />
                </View>
                <View style={{height: button2Height}}>
                    <Button title='confirm check' color='maroon' onPress={() => {
                        setSelectedDate(formikProps.values.weddingDate)
                        setButton1Height(40)
                        setButton2Height(1)
                        setNumberOfMakeups(formikProps.values.numberOfMakeups)
                        setPostcode(formikProps.values.venuePostcode)

                        let s ='';
                        s=formikProps.values.venuePostcode
                        
                        

                        
                        if(formikProps.values.weddingDate === ''){
                            alert('please enter a date')
                        }
                        else if(formikProps.values.venuePostcode === ''){
                            alert('please enter a postcode')
                        }
                        else if(formikProps.values.numberOfMakeups === ''){
                            alert('please enter how many makeups you require')
                        }
                        else if(bookingNameValue){
                            alert('sorry but this date is booked, please try another')
                        }
                        else if(s.charAt(0) !== 'G'){
                            alert("Sorry, I don't cover this area")
                        }
                        else if(numberOfMakeups > 7 ){
                            alert('Sorry, maximum booking size of 7')
                        }
                        else if (numberOfMakeups < maxMakeups){
                            alert('Does not meet minimum number of make ups of:  ' + maxMakeups)

                        }
                        else if(!bookingNameValue && parseInt(formikProps.values.numberOfMakeups) > 3 ){
                            setModalOpen(true);
                        }
                    }
                    }
                    />
                </View>
                        
                        <Modal visible={modalOpen} animationType='slide' propagateSwipe={true}>
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
                                margin: 20,
                                
                            }}
                            >
                            <ScrollView style={{padding:10}}>
                                <MaterialIcons
                                    name='close'
                                    size={26}
                                    style={styles.modalToggle}
                                    onPress={() => setModalOpen(false)}
                                />
                                <View style={styles.modalStyle}>
                                    <Text style={{fontWeight:'300', fontSize:20, textAlign:'center'}}>Success! it looks like your date is available! please confirm 
                                        rest of details below to complete booking</Text>
                                <Text></Text>    

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
                                </View>
                                <View style={styles.container}>
                                    <View> 
                                        <Button title={'Press to calculate price'} onPress={() => {
                                            setNumberOfBrides(formikProps.values.numberOfBrides)
                                            setNumberOfMothersBridesmaids(formikProps.values.numberOfMothersBridesmaids)
                                            setJuniorBridesmaids(formikProps.values.juniorBridesmaids)

                                            const calculatedPrice = (formikProps.values.numberOfBrides*bridePrice) 
                                                                    + (formikProps.values.numberOfMothersBridesmaids*bridesmaidMOBPrice) 
                                                                    + (formikProps.values.juniorBridesmaids*juniorBridesmaidPrice)
                                            console.log ('Calculated Price: ' + calculatedPrice)

                                            setCalculatedPrice(calculatedPrice)
                                        }}/>
                                    </View>
                                        <Text style={{fontWeight:'bold', fontSize:30, textAlign:'center'}}>£{calculatedPrice}</Text>
                                        <Button title='Confirm Booking' color='maroon' onPress={formikProps.handleSubmit}/>
                                        <Text></Text>
                                        <View style={{height: 1}}>                  
                                            <View >
                                                <Text style={{fontSize:24}}>                    {selectedDate}</Text>
                                                <Text style={{color:'#ffffff'}}>{bridePriceText = selectedDate + '.bridePrice'}</Text>
                                                <Text style={{color:'#ffffff'}}>{bridesmaidMobPriceText = selectedDate + '.bridesmaidMOBPrice' }</Text>
                                                <Text style={{color:'#ffffff'}}>{juniorPriceText = selectedDate + '.juniorBridesmaidPrice'}</Text>
                                                <Text style={{color:'#ffffff'}}>{maxMakeupsText = selectedDate + '.maxMakeups' }</Text>
                                            </View>
                                            <Text>My Current Prices:</Text>
                                            <Text>Bride :      {brideValue = Object.byString(items, bridePriceText )}</Text>
                                            <Text>Maid/MOB :      {mobValue = Object.byString(items, bridesmaidMobPriceText )}</Text>
                                            <Text>Junior :      {juniorValue = Object.byString(items, juniorPriceText )}</Text>
                                            <Text>Max Makeups :      {maximumMakeups = Object.byString(items, maxMakeupsText )}</Text>
                                            <View style={{height: 1}}>
                                                <Text>{brideValueInteger = parseInt(brideValue)}</Text>
                                                <Text>{mobValueInteger = parseInt(mobValue)}</Text>
                                                <Text>{juniorValueInteger = parseInt(juniorValue)}</Text>
                                                <Text>{maxMakeupsInteger = parseInt(maximumMakeups)}</Text>
                                            </View>
                                        </View>
                                    </View>  
                                </ScrollView>
                            </View>
                        </View>
                    </Modal>                
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
        padding: 10,
        paddingTop: 40,
    },
    modalToggle:{
        marginBottom: 6,
        marginTop: 5,
        marginRight: 5,
        borderWidth: 2,
        borderColor: 'maroon',
        color: 'maroon',
        padding: 6,
        borderRadius: 4,
        alignSelf: 'flex-end',
    }
})
