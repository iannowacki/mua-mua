import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

const MessengerScreen = ({navigation}) => {
    return(
        <View style={styles.container}>
            <Text>Messenger Screen</Text>
            <Button
                title="Click Here"
                onPress={() => alert('Button Clicked!')}
            />
        </View>
    );
};

export default MessengerScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#8fcddd'
    },
});