import * as firebase from 'firebase';
import "firebase/firestore";

/**
 * Database configuration file
 */
const configuration ={
    apiKey: "AIzaSyC2LQIEbmicJUXB3pBYeRN_-2Kr3upvF4k",
    authDomain: "react-native-chat-57f9d.firebaseapp.com",
    projectId: "react-native-chat-57f9d",
    storageBucket: "react-native-chat-57f9d.appspot.com",
    messagingSenderId: "265609630323",
    appId: "1:265609630323:web:6ded1a401d2f3d83941006"
}

/**
 * Function to connect to and initialise database
 */
firebase.initializeApp(configuration)

/**
 * Creating empty firestore database object
 */
const db = firebase.firestore();

/**
 * Function to bring database content in fromn cloud and provide to rest of app
 * 
 * @param {observer} observer used to trigger functions happening when data has finished loading (for live updates of information)
 */
export const streamBookings = (observer) => {
    db.collection('bookings')
    .orderBy('weddingDate', 'asc')
    .onSnapshot(observer)
}

export default db;


