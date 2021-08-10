import React, {useState} from 'react';
import {View, Text, Button, StyleSheet, Modal, ScrollView} from 'react-native';
import { Calendar, CalendarList } from 'react-native-calendars';
import { MaterialIcons } from '@expo/vector-icons';
import { globalStyles } from '../styles/global';



const CalendarViewScreen = ({navigation}) => {

    

    const notAvailable = {key: 'notAvailable', color: 'red'};
    const massage = {key: 'massage', color: 'blue', selectedDotColor: 'blue'};
    const workout = {key: 'workout', color: 'green'};
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(''); 
    return(
        <View style={styles.containe}>
            
                
            
            <CalendarList 
            onDayPress={(day) => {setModalOpen(true); setSelectedDate(day.dateString) }}

            markingType={'multi-dot'}
            markedDates={{
                '2021-09-25': {dots: [notAvailable], selected: false},
                '2021-09-26': {dots: [massage, workout], disabled: true}
            }} 
            />
            
            
            <Modal visible={modalOpen} animationType='slide'>
                <View style={globalStyles.modalStyle}>
                    <MaterialIcons
                            name='close'
                            size={26}
                            style={globalStyles.modalToggle}
                            onPress={() => setModalOpen(false)}
                            />
                </View>
                <View>
                    <Text></Text>
                    <Text style={{fontSize:24}}>                    {selectedDate}</Text>
                </View>
            </Modal>
        </View>
    );
};

export default CalendarViewScreen;

const styles = StyleSheet.create({
    container: {
        
    },
});