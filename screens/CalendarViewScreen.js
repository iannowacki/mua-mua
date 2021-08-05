import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import { Calendar, CalendarList } from 'react-native-calendars';

const CalendarViewScreen = ({navigation}) => {
    const notAvailable = {key: 'notAvailable', color: 'red'};
    const massage = {key: 'massage', color: 'blue', selectedDotColor: 'blue'};
    const workout = {key: 'workout', color: 'green'};
    return(
        <View style={styles.containe}>
            
            <CalendarList 
            onDayPress={() => navigation.navigate("BookingDetailsScreen")}

            markingType={'multi-dot'}
            markedDates={{
                '2021-09-25': {dots: [notAvailable], selected: false},
                '2021-09-26': {dots: [massage, workout], disabled: true}
            }} 
            />
        </View>
    );
};

export default CalendarViewScreen;

const styles = StyleSheet.create({
    container: {
        
    },
});