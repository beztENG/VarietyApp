import React from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { themeColors } from '../themes';
import ShopCard from './ShopCard';
import { useNavigation } from '@react-navigation/native';

export default function FeaturedRow({ title, description, shops }) {
    const navigation = useNavigation();

    const handleSeeAllPress = () => {
        navigation.navigate('AllShopsScreen', { shops });
    };

    return (
        <View className="mt-5">
            <View className="flex-row justify-between items-center px-4">
                <View>
                    <Text className="font-bold text-xl">{title}</Text>
                    <Text className="text-gray-600 text-sm">{description}</Text>
                </View>
                <TouchableOpacity onPress={handleSeeAllPress}>
                    <Text className="text-blue-500 font-semibold">See All</Text>
                </TouchableOpacity>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 15, paddingVertical: 10 }}>
                {shops.map((shop, index) => (
                    <ShopCard item={shop} key={index} />
                ))}
            </ScrollView>
        </View>
    );
}
