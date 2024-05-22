import { Text, View, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { themeColors } from '../themes';
import * as Icon from 'react-native-feather';
import { useNavigation } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux';
import { selectShop } from '../redux/shopSlice';
import { EmptyCart } from '../redux/cartSlice';

export default function DeliveryScreen({ route }) {
    const shop = useSelector(selectShop);
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { userLocation } = route.params;

    const cancelOrder = () => {
        navigation.navigate('Home');
        dispatch(EmptyCart());
    };

    return (
        <View className="flex-1">
            {/* Map view */}
            <MapView
                initialRegion={{
                    latitude: (shop.lat + userLocation.latitude) / 2,
                    longitude: (shop.lng + userLocation.longitude) / 2,
                    latitudeDelta: Math.abs(shop.lat - userLocation.latitude) + 0.01,
                    longitudeDelta: Math.abs(shop.lng - userLocation.longitude) + 0.01,
                }}
                className="flex-1"
                mapType="standard"
            >
                <Marker
                    coordinate={{
                        latitude: shop.lat,
                        longitude: shop.lng,
                    }}
                    title={shop.name}
                    description={shop.description}
                    pinColor={themeColors.bgColor(1)}
                />
                <Marker
                    coordinate={{
                        latitude: userLocation.latitude,
                        longitude: userLocation.longitude,
                    }}
                    title="Your Location"
                    pinColor="blue"
                />
            </MapView>

            <View className="rounded-t-3xl -mt-12 bg-white relative">
                <View className="flex-row justify-between px-5 pt-10">
                    <View>
                        <Text className="text-lg text-gray-700 font-semibold">Estimated Arrival</Text>
                        <Text className="text-3xl font-extrabold text-gray-700">20-30 minutes</Text>
                        <Text className="mt-2 text-gray-700 font-semibold">Your order is on the way</Text>
                    </View>
                    <Image className="w-24 h-24" source={require('../assets/images/bikeGuy2.gif')} />
                </View>
                <View
                    style={{ backgroundColor: themeColors.bgColor(0.8) }}
                    className="p-2 flex-row justify-between items-center rounded-full my-5 mx-2"
                >
                    <View className="p-1 rounded-full" style={{ backgroundColor: 'rgba(255,255,255,0.4)' }}>
                        <Image className="h-16 w-16 rounded-full" source={require('../assets/images/bikeGuy.png')} />
                    </View>
                    <View className="flex-1 ml-3">
                        <Text className="text-lg font-bold text-white">Quoc Vinh</Text>
                        <Text className="text-lg font-semibold text-white">Your Rider</Text>
                    </View>
                    <View className="flex-row items-center space-x-3 mr-3">
                        <TouchableOpacity className="bg-white p-2 rounded-full">
                            <Icon.Phone fill={themeColors.bgColor(1)} stroke={themeColors.bgColor(1)} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={cancelOrder} className="bg-white p-2 rounded-full">
                            <Icon.X stroke="red" strokeWidth={4} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
}
