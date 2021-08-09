import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import BookingDetailsScreen from "../screens/BookingDetailsScreen";
import CalendarViewScreen from "../screens/CalendarViewScreen";
import NewBookingScreen from "../screens/NewBookingScreen";
import SearchScreen from "../screens/SearchScreen";
import SettingsScreen from "../screens/SettingsScreen";
import MessengerScreen from "../screens/MessengerScreen";
import CreateBooking from "../screens/CreateBooking";
import Bookings from "../screens/Bookings";
import { TouchableWithoutFeedback } from "react-native";
import {Ionicons} from '@expo/vector-icons';

const Stack = createStackNavigator(); 

const MessengerScreenNavigator = () => {
  return (
    <Stack.Navigator >
      <Stack.Screen name="Messenger" component={MessengerScreen} options={{headerShown: true}}/>
      <Stack.Screen name="BookingDetailsScreen" component={BookingDetailsScreen} />
    </Stack.Navigator>
  );
}

export {MessengerScreenNavigator};  



const CalendarViewScreenNavigator = () => {
    return (
      <Stack.Navigator >
        <Stack.Screen name="Calendar View" component={CalendarViewScreen} />
        <Stack.Screen name="BookingDetailsScreen" component={BookingDetailsScreen} />
      </Stack.Navigator>
    );
  }
  
  export {CalendarViewScreenNavigator}; 

  const NewBookingScreenNavigator = () => {
    return (
      <Stack.Navigator >
        <Stack.Screen 
          name="New Booking Form" 
          component={NewBookingScreen} 
          options={({navigation}) => ({
            headerRight: () => (
              <TouchableWithoutFeedback onPress={() => navigation.navigate('BookingDetailsScreen')}>
                <Ionicons 
                  name={'ios-add'} 
                  size={34} 
                  color={'#0080ff'} 
                  style={{marginRight: 25}} />
              </TouchableWithoutFeedback>
            )
          })}
        />
        <Stack.Screen name="BookingDetailsScreen" component={BookingDetailsScreen} />
        <Stack.Screen name="Create Booking" component={CreateBooking} />
        <Stack.Screen name="Bookings" component={Bookings} />
      </Stack.Navigator>
    );
  }
  
  export {NewBookingScreenNavigator};  

  const SearchScreenNavigator = () => {
    return (
      <Stack.Navigator >
        <Stack.Screen name="Search Bookings" component={SearchScreen} />
        <Stack.Screen name="BookingDetailsScreen" component={BookingDetailsScreen} />
      </Stack.Navigator>
    );
  }
  
  export {SearchScreenNavigator};  

  const SettingsScreenNavigator = () => {
    return (
      <Stack.Navigator >
        <Stack.Screen name="Settings Page" component={SettingsScreen} />
        <Stack.Screen name="BookingDetailsScreen" component={BookingDetailsScreen} />
      </Stack.Navigator>
    );
  }
  
  export {SettingsScreenNavigator};  