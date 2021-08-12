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
            setSelectedDate('2021-09-23')
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






    const navigation = useNavigation()
    const [modalOpen, setModalOpen] = useState(false) 
    const validationSchema = yup.object().shape({
        name: yup.string().required(),
    })
    return (
        <View>
            <View>
                {/* <Button title={'click me'} onPress={setSelectedDate('2021-09-30')} /> */}
                <View>                  
                    <View style={{height: 1}}>
                        <Text style={{fontSize:24}}>                    {selectedDate}</Text>
                        <Text style={{color:'#ffffff'}}>{bridePriceText = selectedDate + '.bridePrice'}</Text>
                        <Text style={{color:'#ffffff'}}>{bridesmaidMobPriceText = selectedDate + '.bridesmaidMOBPrice' }</Text>
                        <Text style={{color:'#ffffff'}}>{juniorPriceText = selectedDate + '.juniorBridesmaidPrice'}</Text>
                        <Text style={{color:'#ffffff'}}>{maxMakeupsText = selectedDate + '.maxMakeups' }</Text>
                    </View>
                        <Text>Bride Price:      {Object.byString(items, bridePriceText )}</Text>
                        <Text>Maids/MOB Price:      {Object.byString(items, bridesmaidMobPriceText )}</Text>
                        <Text>Junior Price :      {Object.byString(items, juniorPriceText )}</Text>
                        <Text>Max no. of Makeups:      {Object.byString(items, maxMakeupsText )}</Text>
                    </View>
                </View>
            
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
