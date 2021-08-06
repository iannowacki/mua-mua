import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Tabs from './navigation/tabs';
import AppContext from './components/AppContext';

const App = () => {
  
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     name: "John",
  //     age: 34,
  //     color: "blue"
  //   }
  // }
  // const [weddingDate, setWeddingDate] = useState('');
  // const [venueName, setWeddingVenue] = useState('');
  

  // const addWeddingDate = (weddingDate) => {
  //   booking.key = booking.weddingDate;
  //   setBookings2((currentBookings) => {
  //       return [booking, ...currentBookings];
  //   });
  // }

  // const userSettings = {
  //   bookings2: bookings2,
  //   addBooking,
  // };

  return(
    // <AppContext.Provider value={userSettings}>
      <NavigationContainer>
        {/* <Tabs screenProps={{...this.state}}/> */}
        <Tabs />
      </NavigationContainer>
    // </AppContext.Provider>
  );
}

export default App;