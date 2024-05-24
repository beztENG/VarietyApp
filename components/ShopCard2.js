import { Text, View, TouchableWithoutFeedback, Image } from 'react-native';
import React from 'react';
import { themeColors } from '../themes';
import * as Icon from "react-native-feather";
import { useNavigation } from '@react-navigation/native';
import { urlFor } from '../sanity';

export default function ShopCard2({ item }) {
    const navigation = useNavigation();
    return (
        <TouchableWithoutFeedback
            onPress={() => navigation.navigate('Shop', { ...item })}
        >
            <View
                style={{
                    shadowColor: themeColors.bgColor(0.2),
                    shadowRadius: 7
                }}
                className="mx-4 bg-white rounded-3xl shadow-lg overflow-hidden"
            >
                <Image
                    className="h-36 w-full rounded-t-3xl"
                    source={{ uri: urlFor(item.image).url() }}
                />
                <View className="p-3 space-y-2">
                    <Text className="text-lg font-bold">{item.name}</Text>
                    <View className="flex-row items-center space-x-1">
                        <Image
                            source={require('../assets/images/fullStar.png')}
                            className="h-4 w-4"
                        />
                        <Text className="text-xs text-green-700">
                            {item.stars} 
                        </Text>
                        <Text className="text-xs text-gray-700">
                            ({item.reviews} review) • 
                            <Text className="font-semibold">
                                {item?.type?.name}
                            </Text>
                        </Text>
                    </View>
                    <View className="flex-row items-center space-x-1">
                        <Icon.MapPin color="gray" width={15} height={15} />
                        <Text className="text-xs text-gray-700">
                            • {item.address}
                        </Text>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}
