import { Text, View, Image } from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

export default function OrderPreparingScreen({ route }) {
    const navigation = useNavigation();
    const { userLocation } = route.params;

    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('Delivery', { userLocation });
        }, 3000);
    }, []);

    return (
        <View className="flex-1 bg-white justify-center items-center">
            <Image source={require('../assets/images/delivery.gif')} />
        </View>
    );
}
