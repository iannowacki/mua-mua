import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import BookingDetailsScreen from "../screens/BookingDetailsScreen";
import BookingFormScreen from "../screens/BookingFormScreen";
import CalendarViewScreen from "../screens/CalendarViewScreen";
import NewBookingScreen from "../screens/NewBookingScreen";
import SearchScreen from "../screens/SearchScreen";
import MessageDetailsScreen from "../screens/MessageDetailsScreen";

import SettingsScreen from "../screens/SettingsScreen";
import MessengerScreen from "../screens/MessengerScreen";
import { TouchableWithoutFeedback } from "react-native";
import {Ionicons} from '@expo/vector-icons';

const Stack = createStackNavigator(); 

const MessengerScreenNavigator = () => {
  return (
    <Stack.Navigator >
      <Stack.Screen name="Messenger" component={MessengerScreen} options={{headerStyle:{backgroundColor: '#F4DFD0'},}} />
      
      <Stack.Screen name="MessageDetailsScreen" component={MessageDetailsScreen} options={{headerStyle:{backgroundColor: '#F4DFD0'},}} />
    </Stack.Navigator>
  );
}

export {MessengerScreenNavigator};  



const CalendarViewScreenNavigator = () => {
    return (
      <Stack.Navigator >
        <Stack.Screen name="Calendar View" component={CalendarViewScreen} options={{headerStyle:{backgroundColor: '#F4DFD0'},}} />
        {/* <Stack.Screen name="BookingDetailsScreen" component={BookingDetailsScreen} /> */}
      </Stack.Navigator>
    );
  }
  
  export {CalendarViewScreenNavigator}; 

  const NewBookingScreenNavigator = () => {
    return (
      <Stack.Navigator >
        <Stack.Screen 
          name="Start a new booking here..." 
          component={NewBookingScreen} 
          options={({navigation}) => ({
            headerRight: () => (
              <TouchableWithoutFeedback onPress={() => navigation.navigate('BookingFormScreen')}>
                <Ionicons 
                  name={'ios-add'} 
                  size={44} 
                  color={'#7D5A5A'} 
                  style={{marginRight: 25, 
                  }} />
              </TouchableWithoutFeedback>
            ),
            headerStyle: {
              backgroundColor: '#F4DFD0',
            },
          })}
        />
        <Stack.Screen name="BookingFormScreen" component={BookingFormScreen} options={{headerStyle:{backgroundColor: '#F4DFD0'},}} />
      </Stack.Navigator>
    );
  }
  
  export {NewBookingScreenNavigator};  

  const SearchScreenNavigator = () => {
    return (
      <Stack.Navigator >
        <Stack.Screen name="View all Bookings" component={SearchScreen} options={{headerStyle:{backgroundColor: '#F4DFD0'},}} />
        <Stack.Screen name="BookingDetailsScreen" component={BookingDetailsScreen} options={{headerStyle:{backgroundColor: '#F4DFD0'},}} />
      </Stack.Navigator>
    );
  }
  
  export {SearchScreenNavigator};  

  const SettingsScreenNavigator = () => {
    return (
      <Stack.Navigator >
        <Stack.Screen name="Settings Page" component={SettingsScreen} options={{headerStyle:{backgroundColor: '#F4DFD0'},}} />
        {/* <Stack.Screen name="BookingDetailsScreen" component={BookingDetailsScreen} /> */}
      </Stack.Navigator>
    );
  }
  
  export {SettingsScreenNavigator};  