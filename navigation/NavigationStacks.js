import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import BookingDetailsScreen from "../screens/BookingDetailsScreen";
import CalendarViewScreen from "../screens/CalendarViewScreen";
import NewBookingScreen from "../screens/NewBookingScreen";
import SearchScreen from "../screens/SearchScreen";
import SettingsScreen from "../screens/SettingsScreen";
import MessengerScreen from "../screens/MessengerScreen";

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
        <Stack.Screen name="New Booking Form" component={NewBookingScreen} />
        <Stack.Screen name="BookingDetailsScreen" component={BookingDetailsScreen} />
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