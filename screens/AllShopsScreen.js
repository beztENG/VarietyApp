import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import ShopCard2 from '../components/ShopCard2';
import { themeColors } from '../themes';

export default function AllShopsScreen({ route }) {
    const { shops } = route.params;


    return (
        <View style={{ flex: 1, backgroundColor: themeColors.bgColor() }}>
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
