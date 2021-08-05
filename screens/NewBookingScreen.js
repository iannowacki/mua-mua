import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

const NewBookingScreen = ({navigation}) => {
    return(
        <View style={styles.container}>
            <Text>New Booking Screen</Text>
            <Button
                title="Click Here"
                onPress={() => alert('Button Clicked!')}
            />
        </View>
    );
};

export default NewBookingScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#8fcddd'
    },
});