import React from 'react';
import {View, Text, Button, StyleSheet, ScrollView} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import globalStyles from '../styles/global';

const SettingsScreen = ({navigation}) => {
    return(
        <ScrollView>
            <View style={styles.container} >
                <Text  >Prices:</Text>
                <Text >Bride</Text>
                <Text>MOB / Adult</Text>
            <TextInput/>
            <Button
                title="Click Here"
                onPress={() => alert('Button Clicked!')}
            />
            </View>
        </ScrollView>
        
    );
};

export default SettingsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#8fcbbc'
    },
});