import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import {MessengerScreenNavigator, CalendarViewScreenNavigator, NewBookingScreenNavigator,
SearchScreenNavigator, SettingsScreenNavigator} from './NavigationStacks';

const Tab = createBottomTabNavigator();

const Tabs = () => {
    return(
        <Tab.Navigator>
            <Tab.Screen name="Calendar" component={CalendarViewScreenNavigator} options={{headerShown: false}}  />
            <Tab.Screen name="Messages" component={MessengerScreenNavigator}  options={{headerShown: false}} />
            <Tab.Screen name="New Booking" component={NewBookingScreenNavigator} options={{headerShown: false}} />
            <Tab.Screen name="Search" component={SearchScreenNavigator} options={{headerShown: false}} />
            <Tab.Screen name="Settings" component={SettingsScreenNavigator} options={{headerShown: false}} />
        </Tab.Navigator>

    );
}
export default Tabs;