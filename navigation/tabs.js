import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import {MessengerScreenNavigator, CalendarViewScreenNavigator, NewBookingScreenNavigator,
SearchScreenNavigator, SettingsScreenNavigator} from './NavigationStacks';
import { Ionicons } from '@expo/vector-icons';
// import IonicIcon from 'react-native-vector-icons/Ionicicons';
// import { Ionicicons } from '@expo/vector-icons';
import { Dimensions } from 'react-native';
const fullScreenWidth = Dimensions.get('window').width;

const Tab = createBottomTabNavigator();

const Tabs = () => {
    return(
        <Tab.Navigator
        initialRouteName={'New Booking'}
        tabBarOptions={{
            activeTintColor: 'lightseagreen',
            inactiveTintColor: 'grey',
            inactiveBackgroundColor: 'white',
            labelStyle:{
                // borderRadius: 5,
                // height: 60,
                // bottom: 25,
                // left: 20,
                // right: 20,
                // height: 90,
                fontSize: 12,
            }
        }}
        screenOptions={
            
            ({route}) => ({
            headerTitle: () => <Text>Header</Text>,
            tabBarIcon: ({focused, color, size, padding}) => {
                let iconName;
                if (route.name === 'Calendar') {
                    iconName = focused ? 'md-calendar' : 'md-calendar-outline';
                } else if (route.name === 'Messages') {
                    iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
                } else if (route.name === 'New Booking') {
                    iconName = focused ? 'add-circle' : 'add-circle-outline';
                } else if (route.name === 'View Bookings') {
                    iconName = focused ? 'ios-search-circle' : 'ios-search-circle-outline';
                } else if (route.name === 'Settings') {
                    iconName = focused ? 'md-checkmark-circle' : 'settings-outline';
                }
                return(
                    <Ionicons 
                    name={iconName} 
                    size={size} 
                    color={color} 
                    
                    />
                );

            },
        })}
        // screenOptions={{
        //     activeTintColor: 'lightseagreen',
        //     inactiveTintColor: 'grey',
        //     labelStyle: {fontSize: 16},
            

        // }}
        >
            <Tab.Screen name="Calendar" component={CalendarViewScreenNavigator} options={{headerShown: false}}  />
            <Tab.Screen name="Messages" component={MessengerScreenNavigator}  options={{headerShown: false}} />
            <Tab.Screen name="New Booking" component={NewBookingScreenNavigator} options={{headerShown: false}} />
            <Tab.Screen name="View Bookings" component={SearchScreenNavigator} options={{headerShown: false}} />
            <Tab.Screen name="Settings" component={SettingsScreenNavigator} options={{headerShown: false}} />
        </Tab.Navigator>

    );
}
export default Tabs;