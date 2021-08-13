import React, {useState, useEffect} from 'react';
import {View, Text, Button, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, ScrollView} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {globalStyles} from '../styles/global';
//import CreateTask from '../components/createBookingForm';
import { Ionicons } from '@expo/vector-icons';
import db, {streamBookings} from '../db/firestore';


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

export default function BookingDetailsScreen  ({route, navigation}) {

    
    function bookMarkingsPopulate(){  
        const reduced = bookings.reduce((acc, currentItem) => {
            const {weddingDate, ...details} = currentItem;
            acc[weddingDate] = {...details, selected: true, selectedColor: 'red'
            };
            return acc;
            },{});
            setItems(reduced); 
        };

    const [items, setItems] = useState({
        // '2021-09-04': [{}],
        // '2021-09-11': [{}],
        '2021-09-18': {dots: [notAvailable], selected: false},
    });
    const [bookings, setBookings ] = useState('')

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
            setSelectedDate('2021-09-23');
            // setBridePrice(brideValueInteger)
            // setMobPrice(mobValueInteger)
            // setJuniorPrice(juniorValueInteger)
            // setBridePrice(parseInt(Object.byString(items, bridePriceText )));
            // setMobPrice(parseInt(Object.byString(items, bridesmaidMobPriceText )));
            // setJuniorPrice(parseInt(Object.byString(items, maxMakeupsText )));
        }
        catch(err){
            console.log(err.message)
        }
        
    }, [bookings])

    let str = '';


    const notAvailable = {key: 'notAvailable', color: 'red'};
    const massage = {key: 'massage', color: 'blue', selectedDotColor: 'blue'};
    const workout = {key: 'workout', color: 'green'};
    
    const [selectedDate, setSelectedDate] = useState(''); 

    const {id, name, weddingDate, venueName, venuePostcode, bookingName, 
        numberOfMakeups, numberOfBrides,numberOfMothersBridesmaids, 
        juniorBridesmaids, bookingPrice} = route.params; 

        const [bridePrice, setBridePrice] = useState(0)
        const [mobPrice, setMobPrice] = useState(0)
        const [juniorPrice, setJuniorPrice] = useState(0)
        // const bridePrice = 80;
        // const mobPrice = 60;
        // const juniorPrice = 40;

        

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
                        {/* <Text>{setBridePrice(brideValueInteger)}</Text>
                        <Text>{setMobPrice(mobValueInteger)}</Text>
                        <Text>{setJuniorPrice(juniorValueInteger)}</Text> */}
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