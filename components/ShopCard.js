import React from 'react';
import { Text, View, TouchableWithoutFeedback, Image } from 'react-native';
import { themeColors } from '../themes';
import * as Icon from "react-native-feather";
import { useNavigation } from '@react-navigation/native';
import { urlFor } from '../sanity';

export default function ShopCard({ item }) {
  const navigation = useNavigation();

  return (
    <TouchableWithoutFeedback onPress={() => navigation.navigate('Shop', { ...item })}>
      <View className="mr-6 bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-200">
        {/* Image */}
        <View className="relative">
          <Image 
            source={{ uri: urlFor(item.image).url() }} 
            className="w-full h-40 object-cover rounded-t-2xl" // Rounded corners on top
          />
          <View className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
            <Text className="text-white font-bold text-lg">{item.name}</Text>
          </View>
        </View>

        {/* Details */}
        <View className="px-3 py-4 space-y-1">
          <View className="flex-row items-center space-x-1">
            <Icon.MapPin color="gray" width="15" height="15" />
            <Text className="text-gray-600 text-sm">{item.address}</Text>
          </View>

          <View className="flex-row items-center space-x-1">
            <Image source={require('../assets/images/fullStar.png')} className="h-4 w-4" />
            <Text className="text-xs">
              <Text className="text-green-700">{item.stars}</Text>
              <Text className="text-gray-600"> ({item.reviews} reviews)</Text> •&nbsp;
              <Text className="font-medium text-gray-800">{item?.type?.name}</Text>
            </Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
