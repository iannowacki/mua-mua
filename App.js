import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Tabs from './navigation/tabs';
import {View, Text, Button, StyleSheet} from 'react-native';

import * as firebase from "firebase";
import 'firebase/firestore';
import Tasks from './components/Tasks';
import Bookings from './screens/Bookings';
import CreateTask from './components/createBookingForm';

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

const App = () => {
  return(
    // <View style={styles.container}>
    //   <Tasks />
    // </View>
    <NavigationContainer>
      <Tabs />
    </NavigationContainer>
    
    // <NavigationContainer>
    //   <CreateTask />
    // </NavigationContainer>
    
  );
}

const styles= StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;