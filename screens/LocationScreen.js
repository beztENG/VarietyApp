import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import { themeColors } from '../themes';
import * as Icon from 'react-native-feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';
import { selectCartItems, selectCartTotal } from '../redux/cartSlice';
import { firebase } from "../config";
import { getImageUrl } from '../api';

export default function LocationScreen() {
    const navigation = useNavigation();
    const route = useRoute();
    const { shopName } = route.params;
    const [address, setAddress] = useState('');
    const [loading, setLoading] = useState(false);
    const cartItems = useSelector(selectCartItems);
    const cartTotal = useSelector(selectCartTotal);

    const handleLocationSubmit = async () => {
        if (!address.trim()) {
            Alert.alert('Error', 'Please enter a valid address.');
            return;
        }

        setLoading(true);
        const apiKey = '5ac007193b7e4f80a3e68dc0e32911d2';
        const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=${apiKey}`;

        try {
            const response = await axios.get(url);
            if (response.data.results.length > 0) {
                const location = response.data.results[0].geometry;
                const userLocation = {
                    latitude: location.lat,
                    longitude: location.lng,
                    latitudeDelta: location.latitudeDelta || 0,
                    longitudeDelta: location.longitudeDelta || 0,
                };
                console.log('User Location:', userLocation);
                await storeOrder(userLocation);
                setLoading(false);
                navigation.navigate('OrderPreparing', { userLocation });
            } else {
                setLoading(false);
                Alert.alert('Error', 'No results found. Please try again.');
            }
        } catch (error) {
            setLoading(false);
            console.error('Error fetching location:', error);
            Alert.alert('Error', 'Failed to get location. Please try again.');
        }
    };

    const storeOrder = async (userLocation) => {
        try { 
            const userString = await AsyncStorage.getItem('user'); 
            const user = userString ? JSON.parse(userString) : null;
            if (user) {
                const uploadedItems = await Promise.all(cartItems.map(async (item) => {
                    try {
                        const imageUrl = getImageUrl(item.image);
                        console.log(`Fetching image for item ${item.name} from URL: ${imageUrl}`);
                        const response = await fetch(imageUrl);
                        if (!response.ok) {
                            throw new Error(`Network response was not ok for ${imageUrl}`);
                        }
                        const blob = await response.blob();
                        console.log(`Image fetched and converted to blob for item ${item.name}`);

                        const storageRef = firebase.storage().ref().child(`productImages/${user.uid}/${item._id}`);
                        const uploadTaskSnapshot = await storageRef.put(blob);
                        console.log(`Image uploaded for item ${item.name}:`, uploadTaskSnapshot);

                        const downloadURL = await storageRef.getDownloadURL();
                        console.log(`Image download URL for item ${item.name}: ${downloadURL}`);

                        return {
                            ...item,
                            image: downloadURL
                        };
                    } catch (error) {
                        console.error(`Error uploading image for item ${item.name}:`, error);
                        Alert.alert('Error', `Failed to upload image for item ${item.name}.`);
                        throw error;
                    }
                }));

                const orderData = {
                    userId: user.uid,
                    items: uploadedItems,
                    total: cartTotal,
                    address: address,
                    shopName: shopName,
                    location: {
                        latitude: userLocation.latitude,
                        longitude: userLocation.longitude,
                        latitudeDelta: userLocation.latitudeDelta,
                        longitudeDelta: userLocation.longitudeDelta
                    },
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                };
                console.log('Order Data:', orderData);
                await firebase.firestore().collection('orders').add(orderData);
            } else {
                Alert.alert("User data not found in AsyncStorage!");
            }
        } catch (error) {
            console.error('Error storing order:', error);
            Alert.alert('Error', 'Failed to store order. Please try again.');
        }
    };

    return (
        <View className="flex-1 p-4 bg-white">
            <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{ backgroundColor: themeColors.bgColor(1) }}
                className="absolute z-10 rounded-full p-1 shadow top-5 left-2"
            >
                <Icon.ArrowLeft strokeWidth={3} stroke="white" />
            </TouchableOpacity>
            <View className="mt-8">
                <Text className="text-xl font-bold text-center">Enter your delivery address</Text>
                <Text className="text-center text-gray-500 mt-2">{shopName}</Text>
                <TextInput
                    value={address}
                    onChangeText={setAddress}
                    placeholder="e.g. 123 Main St, Springfield"
                    className="border p-2 mt-4 rounded"
                />
                <TouchableOpacity
                    onPress={handleLocationSubmit}
                    style={{ backgroundColor: themeColors.bgColor(1) }}
                    className="p-3 mt-4 rounded-full"
                    disabled={loading}
                >
                    <Text className="text-white text-center font-bold text-lg">{loading ? 'Loading...' : 'Confirm Location'}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
