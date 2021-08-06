import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


import {MessengerScreenNavigator, CalendarViewScreenNavigator, NewBookingScreenNavigator,
SearchScreenNavigator, SettingsScreenNavigator} from './NavigationStacks';

const Tab = createMaterialBottomTabNavigator();

const Tabs = () => {
    return(
        <Tab.Navigator inactiveColor='#FFFFFF' backBehaviour = "none" >
            <Tab.Screen name="Calendar" component={CalendarViewScreenNavigator} options={{headerShown: false, tabBarLabel: 'Calendar', tabBarIcon: ({ color }) => (<MaterialCommunityIcons name="calendar-month-outline" color={color} size={26} />),}}  />
            <Tab.Screen name="Messages" component={MessengerScreenNavigator}  options={{headerShown: false, tabBarLabel: 'Messages',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="email" color={color} size={26} />
          ),}} />
            <Tab.Screen name="New Booking" component={NewBookingScreenNavigator} options={{headerShown: false, tabBarLabel: 'New Booking',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="gamepad-round" color={color} size={26} />
          ),}} />
            <Tab.Screen name="View Bookings" component={SearchScreenNavigator} options={{headerShown: false, tabBarLabel: 'View Bookings',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="magnify" color={color} size={26} />
          ),}} />
            <Tab.Screen name="Settings" component={SettingsScreenNavigator} options={{headerShown: false, tabBarLabel: 'Settings',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="cog-outline" color={color} size={26} />
          ),}} />
        </Tab.Navigator>

    );
}
export default Tabs;