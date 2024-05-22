import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { themeColors } from '../themes';
import * as Icon from 'react-native-feather';

export default function LocationScreen() {
    const navigation = useNavigation();
    const [address, setAddress] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLocationSubmit = () => {
        setLoading(true);
        const apiKey = '5ac007193b7e4f80a3e68dc0e32911d2'; 
        const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=${apiKey}`;

        axios.get(url)
            .then(response => {
                if (response.data.results.length > 0) {
                    const location = response.data.results[0].geometry;
                    const userLocation = {
                        latitude: location.lat,
                        longitude: location.lng,
                    };
                    setLoading(false);
                    navigation.navigate('OrderPreparing', { userLocation });
                } else {
                    setLoading(false);
                    Alert.alert('Error', 'No results found. Please try again.');
                }
            })
            .catch(error => {
                setLoading(false);
                Alert.alert('Error', 'Failed to get location. Please try again.');
            });
    };

    return (
        <View className="flex-1 p-4 bg-white">
            <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{ backgroundColor: themeColors.bgColor(1) }}
                className="rounded-full p-1 shadow top-5 left-2"
            >
                <Icon.ArrowLeft strokeWidth={3} stroke="white" />
            </TouchableOpacity>
            <View className="mt-8">
                <Text className="text-xl font-bold text-center">Enter your delivery address</Text>
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
