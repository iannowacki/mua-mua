import React, {useState} from 'react';
import {View, Text, Button, StyleSheet, Modal, TouchableOpacity} from 'react-native';
import BookingDetailsScreen from './BookingDetailsScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialIcons } from '@expo/vector-icons';
import { FlatList } from 'react-native-gesture-handler';

const SearchScreen = ({navigation}) => {
    const [bookings, setBookings] = useState([
        {weddingDate: '2021-08-14', 
        venueName: 'Brig o doon',
        venuePostcode: 'G81 2AZ',
        bookingName: 'Senga McLauchlin',
        numberOfMakeups: 6,
        numberOfBrides: 1,
        numberOfMothersBridesmaids: 3,
        juniorBridesmaids: 1,
        flowerGirls: 1,
        bookingPrice: 250,
        key: '1'
    },
    {weddingDate: '2021-08-15', 
        venueName: 'Lodge on the Loch',
        venuePostcode: 'G82 4JF',
        bookingName: 'Sinead Maguire',
        numberOfMakeups: 4,
        numberOfBrides: 1,
        numberOfMothersBridesmaids: 3,
        juniorBridesmaids: 0,
        flowerGirls: 0,
        bookingPrice: 250,
        key: '2'
    },
    {weddingDate: '2021-08-28', 
        venueName: 'Planet Hollywood',
        venuePostcode: 'X11 0OO',
        bookingName: 'Gloria Shepherd',
        numberOfMakeups: 4,
        numberOfBrides: 2,
        numberOfMothersBridesmaids: 2,
        juniorBridesmaids: 0,
        flowerGirls: 0,
        bookingPrice: 500,
        key: '3'
    },
    ])
    
    return(
        <View style={styles.container}>
            <FlatList
                data={bookings}
                renderItem={({item}) => (
                    <TouchableOpacity style={styles.flatListItem} onPress={() => navigation.navigate('BookingDetailsScreen', item)}>
                        <Text >Date: {item.weddingDate}</Text>
                        <Text >Venue: {item.venueName}</Text>
                        <Text >Name: {item.bookingName}</Text>
                    </TouchableOpacity>

                )}
            >
            </FlatList>
        </View>
    );
};


export default SearchScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#8fceee'
    },
    flatListItem:{
        padding: 16,
        marginTop: 16,
        borderColor: '#ffff',
        borderWidth: 1,
        borderStyle: 'dashed',
        borderRadius: 10

    },
    modalView: {
        padding: 30,
        
    }
});


// const SearchScreen = ({navigation}) => {
//     const [modalOpen, setModalOpen] = useState(false);
//     return(
//         <View style={styles.container}>
//             <Modal visible={modalOpen} animationType='slide'>
//                 <View style={styles.modalView}>
//                     <Text>Date</Text>
//                     <MaterialIcons
//                     name='close'
//                     size={24}
//                     onPress={() => setModalOpen(false)}
//                     />
//                 </View>
                
//             </Modal>
//             <MaterialIcons
//                 name='add'
//                 size={24}
//                 onPress={() => setModalOpen(true)}
//             />
//             <Text>Search Screen</Text>
//             <Button
//                 title="Click Here"
//                 onPress={() => navigation.navigate("BookingDetailsScreen")}
//             />
//         </View>
//     );
// };


// export default SearchScreen;