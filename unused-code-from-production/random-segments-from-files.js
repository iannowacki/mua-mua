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
