import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Tabs from './navigation/tabs';
import {View, Text, Button, StyleSheet} from 'react-native';
import * as firebase from "firebase";
import 'firebase/firestore';



const App = () => {
  return(
    <NavigationContainer>
      <Tabs />
    </NavigationContainer>
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


// colour pallette: https://colorhunt.co/palette/fdefeff4dfd0dad0c2cdbba7

// #CDBBA7

// #DAD0C2

// #F4DFD0

// #FDEFEF