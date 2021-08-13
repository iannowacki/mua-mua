import React, {useState, useEffect} from 'react';
import {View, Text, Button, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, ScrollView} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {globalStyles} from '../styles/global';
import { Ionicons } from '@expo/vector-icons';
import db, {streamBookings} from '../db/firestore';

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
 * Screen which displays booking details. Accessed through view bookings tab
 * 
 * @param {params} param0 parameters being passed through navigator (parameters are a booking)
 */
export default function BookingDetailsScreen  ({route, navigation}) {

    /**
     * Data structure where date is key and value are the rest of the fields. used to obtain data to calculate price
     */
    const [items, setItems] = useState({
        '2021-09-18': {dots: [notAvailable], selected: false},
    });

    /**
     * Data structure to hold bookings data from db
     */
    const [bookings, setBookings ] = useState('')

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
            setSelectedDate('2021-09-23');
        }
        catch(err){
            console.log(err.message)
        }
        
    }, [bookings])

    //let str = '';

    // Calendar marked date
    const notAvailable = {key: 'notAvailable', color: 'red'};

    // variable that holds currently selected date
    const [selectedDate, setSelectedDate] = useState(''); 

    // Variable to hold incoming data from view bookings page passed through navigation
    const {id, name, weddingDate, venueName, venuePostcode, bookingName, 
        numberOfMakeups, numberOfBrides,numberOfMothersBridesmaids, 
        juniorBridesmaids, bookingPrice} = route.params; 
    
    // variables to hold prices used to calculate total cost of booking    
    const [bridePrice, setBridePrice] = useState(0)
    const [mobPrice, setMobPrice] = useState(0)
    const [juniorPrice, setJuniorPrice] = useState(0)

        
    /**
     * Function to handle db deletes with Ionicon icon library used
     */
    React.useLayoutEffect( () => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableWithoutFeedback
                    onPress={() => {
                        db.collection('bookings')
                        .doc(id)
                        .delete()
                        .then(() => navigation.goBack())
                    }}
                    >
                        <Ionicons name={'ios-trash'}
                        size={35}
                        style={{marginRight: 25}}
                        color={'#0080ff'}
                        />
                    </TouchableWithoutFeedback>
            )
        })
    })


    return (
        <ScrollView>
            <View style={{backgroundColor: '#FDEFEF'}}>
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
            
                    <Text style={{fontWeight:'300', fontSize:12, textAlign:'center'}}>Wedding Date:</Text>
                    <Text style={{fontWeight:'bold', fontSize:25, textAlign:'center'}}>{weddingDate}</Text>
                    <Text></Text>
                    <Text style={{fontWeight:'300', fontSize:12, textAlign:'center'}}>Venue Name:</Text>
                    <Text style={{fontWeight:'bold', fontSize:25, textAlign:'center'}}>{venueName}</Text>
                    <Text></Text>
                    <Text style={{fontWeight:'300', fontSize:12, textAlign:'center'}}>Venue Postcode:  </Text>
                    <Text style={{fontWeight:'bold', fontSize:25, textAlign:'center'}}>{venuePostcode}</Text>
                    <Text></Text>
                    <Text style={{fontWeight:'300', fontSize:12, textAlign:'center'}}>Booking Name:   </Text>
                    <Text style={{fontWeight:'bold', fontSize:25, textAlign:'center'}}>{bookingName}</Text>
                    <Text></Text>
                    <Text style={{fontWeight:'300', fontSize:12, textAlign:'center'}}>Number Of Makeups:  </Text>
                    <Text style={{fontWeight:'bold', fontSize:25, textAlign:'center'}}>{numberOfMakeups}</Text>
                    <Text></Text>
                    <Text style={{fontWeight:'300', fontSize:12, textAlign:'center'}}>Number Of Brides: </Text>
                    <Text style={{fontWeight:'bold', fontSize:25, textAlign:'center'}}>{numberOfBrides}</Text>
                    <Text></Text>
                    <Text style={{fontWeight:'300', fontSize:12, textAlign:'center'}}>MOBS/Bridesmaids:   </Text>
                    <Text style={{fontWeight:'bold', fontSize:25, textAlign:'center'}}>{numberOfMothersBridesmaids}</Text>
                    <Text></Text>
                    <Text style={{fontWeight:'300', fontSize:12, textAlign:'center'}}>Junior Bridesmaids: </Text>
                    <Text style={{fontWeight:'bold', fontSize:25, textAlign:'center'}}>{juniorBridesmaids}</Text>
                    <Text></Text>
                    <Button title={'Calculate price'} onPress={() => {
                        setBridePrice(brideValueInteger)
                        setMobPrice(mobValueInteger)
                        setJuniorPrice(juniorValueInteger)
                    }}/>
                    <Text></Text>
                    <Text style={[globalStyles.bodyText, {paddingBottom: 15, textAlign:'center'}]}>Booking Total Price:  £{((parseInt(numberOfBrides)*bridePrice))+(parseInt(numberOfMothersBridesmaids)*mobPrice)+(parseInt(juniorBridesmaids)*juniorPrice)}</Text>
            
            
                    <View>                  
                        <View style={{height: 1}}>
                            <Text style={{color:'#ffffff'}}>{bridePriceText = selectedDate + '.bridePrice'}</Text>
                            <Text style={{color:'#ffffff'}}>{bridesmaidMobPriceText = selectedDate + '.bridesmaidMOBPrice' }</Text>
                            <Text style={{color:'#ffffff'}}>{juniorPriceText = selectedDate + '.juniorBridesmaidPrice'}</Text>
                            <Text style={{color:'#ffffff'}}>{maxMakeupsText = selectedDate + '.maxMakeups' }</Text>
                        </View>
                        <View style={{height: 1}}>
                            <Text style={{color:'#ffffff'}}>My Current Prices:</Text>
                            <Text style={{color:'#ffffff'}}>Bride :      {brideValue = Object.byString(items, bridePriceText )}</Text>
                            <Text style={{color:'#ffffff'}}>Maid/MOB :      {mobValue = Object.byString(items, bridesmaidMobPriceText )}</Text>
                            <Text style={{color:'#ffffff'}}>Junior :      {juniorValue = Object.byString(items, juniorPriceText )}</Text>
                        </View>
                        <View style={{height: 1}}>
                            
                            <Text style={{color:'#ffffff'}}>{brideValueInteger = parseInt(brideValue)}</Text>
                            <Text style={{color:'#ffffff'}}>{mobValueInteger = parseInt(mobValue)}</Text>
                            <Text style={{color:'#ffffff'}}>{juniorValueInteger = parseInt(juniorValue)}</Text>
                        </View>
                    </View>
                </View>  
            </View>
        </ScrollView>
        )};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#8fcddd'
    },
});