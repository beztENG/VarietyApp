import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { themeColors } from '../themes';
import * as Icon from "react-native-feather";
import { useDispatch, useSelector } from 'react-redux';
import { RemoveFromCart, addToCart, selectCartItemsById } from '../redux/cartSlice';
import { urlFor } from '../sanity';

export default function ProductRow({ item }) {
    const dispatch = useDispatch();
    const totalItems = useSelector(state => selectCartItemsById(state, item._id));

    const handleIncrease = () => {
        dispatch(addToCart({ ...item }));
    };

    const handleDecrease = () => {
        if (totalItems.length > 0) {
            dispatch(RemoveFromCart({ _id: item._id }));
        }
    };

    return (
        <View className="flex-row items-center bg-white p-5 rounded-3xl shadow-md mb-5 mx-5">
            <Image source={{ uri: item.image ? urlFor(item.image).url() : 'URL_mặc_định' }} className="w-24 h-24 rounded-lg" />
            <View className="flex-1 ml-5">
                <Text className="text-xl font-bold mb-2">{item.name}</Text>
                <Text className="text-gray-600 mb-2">{item.description}</Text>
                <View className="flex-row justify-between items-center">
                    <Text className="text-lg font-semibold">${item.price}</Text>
                    <View className="flex-row items-center">
                        <TouchableOpacity
                            onPress={handleDecrease}
                            disabled={!totalItems.length}
                            className={`p-1 rounded-full ${totalItems.length ? 'bg-blue-500' : 'bg-gray-300'} mr-3`}
                        >
                            <Icon.Minus width={20} height={20} stroke={'white'} />
                        </TouchableOpacity>
                        <Text className="text-lg">{totalItems.reduce((total, item) => total + item.quantity, 0)}</Text>
                        <TouchableOpacity
                            onPress={handleIncrease}
                            style={{backgroundColor: themeColors.bgColor(1)}}
                            className="p-1 rounded-full bg-blue-500 ml-3"
                        >
                            <Icon.Plus width={20} height={20} stroke={'white'} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
}
