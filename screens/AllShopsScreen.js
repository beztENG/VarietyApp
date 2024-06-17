import React from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import ShopCard2 from '../components/ShopCard2';
import { themeColors } from '../themes';
import * as Icon from "react-native-feather";
import { useNavigation } from '@react-navigation/native';

export default function AllShopsScreen({ route }) {
    const { shops } = route.params;
    const navigation = useNavigation();

    return (
        <View style={{ flex: 1, backgroundColor: themeColors.bgColor(), marginTop: 50 }}>
            <TouchableOpacity
                onPress={() => navigation.goBack()}
                className="absolute top-4 left-4 bg-gray-200 p-2 rounded-full shadow"
                style={{ zIndex: 10 }} // Added zIndex property
            >
                <Icon.ArrowLeft strokeWidth={3} stroke={themeColors.bgColor(1)} />
            </TouchableOpacity>
            <ScrollView contentContainerStyle={{ paddingVertical: 20, paddingHorizontal: 15 }}>
                {shops.map((shop, index) => (
                    <View key={index} style={{ marginBottom: 20 }}>
                        <ShopCard2 item={shop} />
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}
