// const firebaseConfig = {
//   apiKey: "AIzaSyDKe05hQwLAZi_NmK1GwLJ0UqaOG-H2EVk",
//   authDomain: "mua-mua-47987.firebaseapp.com",
//   databaseURL: "https://mua-mua-47987-default-rtdb.europe-west1.firebasedatabase.app",
//   projectId: "mua-mua-47987",
//   storageBucket: "mua-mua-47987.appspot.com",
//   messagingSenderId: "122692162260",
//   appId: "1:122692162260:web:31cff2feb281a0a9f8e141"
// };
// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);

// const db = firebase.firestore();

// db.collection("bookings").doc("mario").set({
//   weddingDate: "2021-09-04",
//   venueName: "Brig O Doon",
//   specialAttack: "fireball"
// })


// const SearchScreen = ({navigation}) => {
//     const [modalOpen, setModalOpen] = useState(false);
//     return(
//         <View style={styles.container}>
//             <Modal visible={modalOpen} animationType='slide'>
//                 <View style={styles.modalView}>
//                     <Text>Date</Text>
//                     <MaterialIcons
//                     name='close'
//                     size={24}
//                     onPress={() => setModalOpen(false)}
//                     />
//                 </View>
                
//             </Modal>
//             <MaterialIcons
//                 name='add'
//                 size={24}
//                 onPress={() => setModalOpen(true)}
//             />
//             <Text>Search Screen</Text>
//             <Button
//                 title="Click Here"
//                 onPress={() => navigation.navigate("BookingDetailsScreen")}
//             />
//         </View>
//     );
// };


// export default SearchScreen;


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


// import React from 'react';
// import { TextInput, View, Button, Text } from 'react-native';
// import { Formik, validateYupSchema } from 'formik';
// import db from '../db/firestore';
// import * as yup from 'yup';
// import { useNavigation } from '@react-navigation/native';
// import { globalStyles } from '../styles/global';

// const FormProps = {
//     name: String
// }

// const CreateTask = () => {

//     const navigation = useNavigation()

//     const validationSchema = yup.object().shape({
//         name: yup.string().required(),
//     })

//     return (
//         <View>
//             <Text>Mic Check one two</Text>
//             {/* <Formik 
//               initialValues={{name: ''}}
//               onSubmit={(values) => {
//                 db.collection('tasks').add({
//                     name: values.name,
//                     createdAt: new Date(),
//                     completedAt: null,
//                 }).then(result => navigation.navigate('BookingDetailsScreen'))
//                   .catch(err => console.log(err))
//               }}
//               validationSchema={validationSchema}
//             >
//                 {({
//                     values, 
//                     handleChange, 
//                     errors,
//                     handleSubmit}) => {
//                     <View>
//                         <TextInput
//                         onChangeText={handleChange('name')}
//                         placeholder={'Describe Task'}
//                         value={values.name}
//                         autoFocus={true} />
//                         { errors['name'] ? <Text>{errors['name']}</Text> : null }
//                         <Button title={'Create'} onPress ={()=> handleSubmit()} />
//                     </View>
//                 }

//                 }
//             </Formik> */}
//             < Formik
//                 initialValues={{weddingDate: '', venuePostcode: '', numberOfMakeups: ''}}
//                 onSubmit={(values) => {
//                     db.collection('tasks').add({
//                         name: values.weddingDate,
//                         createdAt: new Date(),
//                         completedAt: null,
//                     }).then(result => navigation.goBack())
//                       .catch(err => console.log(err))
//                   }}
//             >
                
//                 {(formikProps) => (
//                     <View>
//                         <TextInput style={globalStyles.newBookForm} 
//                         placeholder='Wedding Date'
//                         onChangeText={formikProps.handleChange('weddingDate')}
//                         value={formikProps.values.weddingDate}
//                         >
//                         </TextInput>

//                         <TextInput style={globalStyles.newBookForm} 
//                         placeholder='Venue Postcode'
//                         onChangeText={formikProps.handleChange('venuePostcode')}
//                         value={formikProps.values.venuePostcode}> 
//                         </TextInput>

//                         <TextInput style={globalStyles.newBookForm} 
//                         placeholder='Number of makeups'
//                         onChangeText={formikProps.handleChange('numberOfMakeups')}
//                         value={formikProps.values.numberOfMakeups}
//                         keyboardType='numeric'> 
//                         </TextInput>

//                         <Button title='sumbit' color='maroon' onPress={formikProps.handleSubmit}/>
//                         {/* <Button title='sumbit' color='maroon' onPress={()=>alert("Always don't be not alert")}/> */}
//                     </View>
//                 )}
//             </Formik>
//         </View>
//     )
// }

// export default CreateTask

// < Formik
        //         initialValues={{name: '', weddingDate: '', venuePostcode: '', numberOfMakeups: ''}}
        //         onSubmit={onSubmit}
        //     >
                
        //         {(formikProps) => (
        //             <View>
        //                 <TextInput style={globalStyles.newBookForm} 
        //                 placeholder='name'
        //                 onChangeText={formikProps.handleChange('name')}
        //                 value={formikProps.values.name}
        //                 >
        //                 </TextInput>

        //                 <TextInput style={globalStyles.newBookForm} 
        //                 placeholder='Wedding Date'
        //                 onChangeText={formikProps.handleChange('weddingDate')}
        //                 value={formikProps.values.weddingDate}
        //                 >
        //                 </TextInput>

        //                 <TextInput style={globalStyles.newBookForm} 
        //                 placeholder='Venue Postcode'
        //                 onChangeText={formikProps.handleChange('venuePostcode')}
        //                 value={formikProps.values.venuePostcode}> 
        //                 </TextInput>

        //                 <TextInput style={globalStyles.newBookForm} 
        //                 placeholder='Number of makeups'
        //                 onChangeText={formikProps.handleChange('numberOfMakeups')}
        //                 value={formikProps.values.numberOfMakeups}
        //                 keyboardType='numeric'> 
        //                 </TextInput>

        //                 <Button title={btnValue} color='maroon' onPress={formikProps.handleSubmit}/>
        //                 {/* <Button title='sumbit' color='maroon' onPress={()=>alert("Always don't be not alert")}/> */}
        //             </View>
        //         )}
        //     </Formik>

        // export const getTasks = () => {
//     return db.collection('tasks')
//         .get()
//         .then(result => result.docs)
//         .then(docs => docs.map(doc => ({
//             id: doc.id,
//             name: doc.data().name,
//             createdAt: doc.data().createdAt,
//             completedAt: doc.data().completedAt
            
//         }))) 
// }

// const user = await firestore().collection('bookings').doc('ABC').get();

    // const settingFile = db.collection('bookings').doc("dXXA92fD3hBOn3dM9KFE").get();

    // const [settings, setSettings ] = useState()

    // const mapDocToSetting = (document) => {
    //     return {
    //         id: document.id,
    //         maxMakeups: document.data().maxMakeups,
    //         maxMiles: document.data().maxMiles,
    //         bridePrice: document.data().bridePrice,
    //         bridesmaidMOBPrice: document.data().bridesmaidMOBPrice,
    //         juniorBridesmaidPrice: document.data().juniorBridesmaidPrice,
    //     };
    // };

    // useEffect(() => {
    //     const unsubscribe = streamBookings({
    //         next: querySnapshot => {
    //             const bookings = querySnapshot
    //             .docs.map(docSnapshot => mapDocToSetting(docSnapshot));
    //             setSettings(bookings);
    //         },
    //         error: (error) => console.log(error),
    //     });
    //     return unsubscribe
    // }, [setSettings]);



    // const docRef = db.collection("bookings").doc("dXXA92fD3hBOn3dM9KFE");

    // const [store, setStore] = useState()
    // const [loading, setLoading] = useState(true) // show a loading spinner instead of store data until it's available
  
    // useEffect(() => {

    
  
    //   const fetchQuery = async () => {
    //     const storeData = await db
    //       .collection('bookings')
    //       .doc('dXXA92fD3hBOn3dM9KFE')
    //       .get() // this queries the database
  
    //       if (storeData) {
    //         setStore(storeData) // save the data to store state
    //         setLoading(false) // set loading to false 
    //       } else {
    //         // something went wrong, show an error message or something
    //       }
    //   }
  
    //   fetchQuery()
  
    // }, ['dXXA92fD3hBOn3dM9KFE'])

    // export const streamSettings = (observer) => {
    //     db.collection('bookings')
    //     .doc('settingsDocument')
        
    // }
    // const [bookings, setDummyBookings] = useState([
    //     {weddingDate: '2021-08-14', venueName: 'Brig o doon', venuePostcode: 'G81 2AZ', bookingName: 'Senga McLauchlin', numberOfMakeups: 6, numberOfBrides: 1, numberOfMothersBridesmaids: 3, juniorBridesmaids: 1, flowerGirls: 1, bookingPrice: 250, key: '2021-08-14'},
    //     {weddingDate: '2021-08-15', venueName: 'Lodge on the Loch', venuePostcode: 'G82 4JF', bookingName: 'Sinead Maguire', numberOfMakeups: 4, numberOfBrides: 1, numberOfMothersBridesmaids: 3, juniorBridesmaids: 0, flowerGirls: 0, bookingPrice: 250, key: '2021-08-15'},
    //     {weddingDate: '2021-08-18', venueName: 'Planet Hollywood', venuePostcode: 'X11 0OO', bookingName: 'Gloria Shepherd', numberOfMakeups: 4, numberOfBrides: 2, numberOfMothersBridesmaids: 2, juniorBridesmaids: 0, flowerGirls: 0, bookingPrice: 500, key: '2021-08-18'},
    //     {weddingDate: '2021-08-20', venueName: 'Brig o doon', venuePostcode: 'G81 2AZ', bookingName: 'Senga McLauchlin', numberOfMakeups: 6, numberOfBrides: 1, numberOfMothersBridesmaids: 3, juniorBridesmaids: 1, flowerGirls: 1, bookingPrice: 250, key: '4'},
    //     {weddingDate: '2021-08-23', venueName: 'Lodge on the Loch', venuePostcode: 'G82 4JF', bookingName: 'Stacey Mollock', numberOfMakeups: 4, numberOfBrides: 1, numberOfMothersBridesmaids: 3, juniorBridesmaids: 0, flowerGirls: 0, bookingPrice: 250, key: '5'},
    //     {weddingDate: '2021-08-24', venueName: 'Planet Hollywood', venuePostcode: 'X11 0OO', bookingName: 'Claire Thomson', numberOfMakeups: 4, numberOfBrides: 2, numberOfMothersBridesmaids: 2, juniorBridesmaids: 0, flowerGirls: 0, bookingPrice: 500, key: '6'},
    //     {weddingDate: '2021-08-27', venueName: 'Brig o doon', venuePostcode: 'G81 2AZ', bookingName: 'Sam Jones', numberOfMakeups: 6, numberOfBrides: 1, numberOfMothersBridesmaids: 3, juniorBridesmaids: 1, flowerGirls: 1, bookingPrice: 250, key: '7'},
    //     {weddingDate: '2021-08-28', venueName: 'Lodge on the Loch', venuePostcode: 'G82 4JF', bookingName: 'Mia Farley', numberOfMakeups: 4, numberOfBrides: 1, numberOfMothersBridesmaids: 3, juniorBridesmaids: 0, flowerGirls: 0, bookingPrice: 250, key: '8'},
    //     {weddingDate: '2021-08-29', venueName: 'Planet Hollywood', venuePostcode: 'X11 0OO', bookingName: 'Agnes Boyd', numberOfMakeups: 4, numberOfBrides: 2, numberOfMothersBridesmaids: 2, juniorBridesmaids: 0, flowerGirls: 0, bookingPrice: 500, key: '9'},
    // ]);

    // const addBooking = (booking) => {
    //     booking.key = booking.weddingDate;
    //     setDummyBookings((currentBookings) => {
    //         return [booking, ...currentBookings];
    //     });
    // }

    // import React from 'react';
// import {View, Text, Button, StyleSheet} from 'react-native';

// const MessengerScreen = ({navigation}) => {
//     return(
//         <View style={styles.container}>
//             <Text>Messenger Screen</Text>
//             <Button
//                 title="Click Here"
//                 onPress={() => alert('Button Clicked!')}
//             />
//         </View>
//     );
// };

// export default MessengerScreen;

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center',
//         backgroundColor: '#8fcddd'
//     },
// });

{/* <View>
                <Button title={'click me'} onPress={setSelectedDate('2021-09-30')} />
                <View>                  
                    <View style={{height: 1}}>
                        <Text style={{fontSize:24}}>                    {selectedDate}</Text>
                        <Text style={{color:'#ffffff'}}>{bridePriceText = selectedDate + '.bridePrice'}</Text>
                        <Text style={{color:'#ffffff'}}>{bridesmaidMobPriceText = selectedDate + '.bridesmaidMOBPrice' }</Text>
                        <Text style={{color:'#ffffff'}}>{juniorPriceText = selectedDate + '.juniorBridesmaidPrice'}</Text>
                        <Text style={{color:'#ffffff'}}>{maxMakeupsText = selectedDate + '.maxMakeups' }</Text>
                        <Text style={{color:'#ffffff'}}>{isAvailableText = selectedDate + '.isAvailable' }</Text>
                        <Text style={{color:'#ffffff'}}>{isBookedText = selectedDate + '.isBooked' }</Text>
                    </View>
                        <Text>Bride Price:      {brideValue = Object.byString(items, bridePriceText )}</Text>
                        <Text>Maids/MOB Price:      {mobValue = Object.byString(items, bridesmaidMobPriceText )}</Text>
                        <Text>Junior Price :      {juniorValue = Object.byString(items, juniorPriceText )}</Text>
                        <Text>Max no. of Makeups:      {maxMakeupsValue = Object.byString(items, maxMakeupsText )}</Text>
                        <Text>Is Booked?:      {isBookedValue = Object.byString(items, isBookedText )}</Text>
                        <Text>{toString(isBookedValue)}</Text>
                    </View>
            </View> */}


{/* <Button title={'click me'} onPress={setSelectedDate('2021-09-30')} /> */}

// console.log(bookingNameValue)
                          
                                
                            
                            
                            // if (parseInt(formikProps.values.numberOfMakeups) > 3) {
                                
                            // } else if (!parseInt(formikProps.values.numberOfMakeups) || parseInt(formikProps.values.numberOfMakeups) < 3){
                            //     // alert('Sorry, minimum 4 makeups for wedding booking');
                            // }
                            // else if (bookingNameValue === 'undefined'){
                            //     // setModalOpen(true);
                            // }

  // try{
                                
                            //     console.log(bookingNameValue.length)
                            // }
                            // catch(err){
                            //     console.log(err.message)
                            // }

// if (parseInt(formikProps.values.numberOfMakeups) > 3) {
                                
                            // } else if (!parseInt(formikProps.values.numberOfMakeups) || parseInt(formikProps.values.numberOfMakeups) < 3){
                            //     alert('Sorry, minimum 4 makeups for wedding booking');
                            // }
                            // else if (!bookingNameValue){
                            //     setModalOpen(true);
                            // } 
{/* <Button title='sumbit' color='maroon' onPress={()=>alert("Always don't be not alert")}/> */}

{/* <View>
                <Button title={'click me'} onPress={setSelectedDate('2021-09-30')} />
                <View>                  
                    <View style={{height: 1}}>
                        <Text style={{fontSize:24}}>                    {selectedDate}</Text>
                        <Text style={{color:'#ffffff'}}>{bridePriceText = selectedDate + '.bridePrice'}</Text>
                        <Text style={{color:'#ffffff'}}>{bridesmaidMobPriceText = selectedDate + '.bridesmaidMOBPrice' }</Text>
                        <Text style={{color:'#ffffff'}}>{juniorPriceText = selectedDate + '.juniorBridesmaidPrice'}</Text>
                        <Text style={{color:'#ffffff'}}>{maxMakeupsText = selectedDate + '.maxMakeups' }</Text>
                        <Text style={{color:'#ffffff'}}>{isAvailableText = selectedDate + '.isAvailable' }</Text>
                        <Text style={{color:'#ffffff'}}>{isBookedText = selectedDate + '.isBooked' }</Text>
                    </View>
                        <Text>Bride Price:      {brideValue = Object.byString(items, bridePriceText )}</Text>
                        <Text>Maids/MOB Price:      {mobValue = Object.byString(items, bridesmaidMobPriceText )}</Text>
                        <Text>Junior Price :      {juniorValue = Object.byString(items, juniorPriceText )}</Text>
                        <Text>Max no. of Makeups:      {maxMakeupsValue = Object.byString(items, maxMakeupsText )}</Text>
                        <Text>Is Booked?:      {isBookedValue = Object.byString(items, isBookedText )}</Text>
                        <Text>{toString(isBookedValue)}</Text>
                    </View>
            </View> */}

                    // '2021-09-04': [{}],
        // '2021-09-11': [{}],

        // console.log(bookingNameValue)
                          
                                
                            
                            
                            // if (parseInt(formikProps.values.numberOfMakeups) > 3) {
                                
                            // } else if (!parseInt(formikProps.values.numberOfMakeups) || parseInt(formikProps.values.numberOfMakeups) < 3){
                            //     // alert('Sorry, minimum 4 makeups for wedding booking');
                            // }
                            // else if (bookingNameValue === 'undefined'){
                            //     // setModalOpen(true);
                            // }


                            // try{
                                
                            //     console.log(bookingNameValue.length)
                            // }
                            // catch(err){
                            //     console.log(err.message)
                            // }

                            // if (parseInt(formikProps.values.numberOfMakeups) > 3) {
                                
                            // } else if (!parseInt(formikProps.values.numberOfMakeups) || parseInt(formikProps.values.numberOfMakeups) < 3){
                            //     alert('Sorry, minimum 4 makeups for wedding booking');
                            // }
                            // else if (!bookingNameValue){
                            //     setModalOpen(true);
                            // } 

                             {/* <Button title='sumbit' color='maroon' onPress={()=>alert("Always don't be not alert")}/> */}

                             //let str = '';