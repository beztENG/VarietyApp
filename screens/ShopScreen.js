import React, { useEffect } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Image, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { themeColors } from '../themes';
import * as Icon from "react-native-feather";
import ProductRow from '../components/productRow';
import CartIcon from '../components/cartIcon';
import { StatusBar } from 'expo-status-bar';
import { useDispatch } from 'react-redux';
import { setShop } from '../redux/shopSlice';
import { urlFor } from '../sanity';
import { EmptyCart } from '../redux/cartSlice';
import Animated, { FadeInUp, Layout } from 'react-native-reanimated'; // Import Layout


export default function ShopScreen() {
  const { params } = useRoute();
  const navigation = useNavigation();
  const item = params;
  const dispatch = useDispatch();
  const { width } = useWindowDimensions(); 

  useEffect(() => {
    if (item && item._id) {
      dispatch(setShop({ ...item }));
    }
  }, []);

  const cancelOrder = () => {
    navigation.navigate('Home');
    dispatch(EmptyCart());
  };

  return (
    <View style={{ backgroundColor: '#f5f5f5', flex: 1 }}> 
      <CartIcon />
      <StatusBar style="light" />
      <ScrollView>
        {/* Shop Header */}
        <View className="relative">
          <Animated.Image
            sharedTransitionTag={`image-${item._id}`}
            source={{ uri: urlFor(item.image).url() }} 
            className="w-full" 
            style={{ height: 250, borderBottomLeftRadius: 40, borderBottomRightRadius: 40 }}
            entering={FadeInUp}
          />

          {/* Overlay Container */}
          <View className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
            <View className="bg-white/60 p-3 rounded-lg">
              <Text className="text-black text-3xl font-bold">{item.name}</Text>
              
              <View className="flex-row items-center mt-2">
                <Icon.MapPin color="black" width="15" height="15" />
                <Text className="text-black text-sm ml-1">{item.address}</Text>
              </View>

              <View className="flex-row items-center mt-1">
                <Image source={require('../assets/images/fullStar.png')} className="h-4 w-4" />
                <Text className="text-black text-xs ml-1">
                  {item.stars} ({item.reviews} reviews) • {item?.type?.name}
                </Text>
              </View>
            </View> 
          </View>

          {/* Cancel Button (X) */}
          <TouchableOpacity 
            onPress={cancelOrder} 
            className="absolute top-5 right-5 bg-white/80 p-2 rounded-full shadow"
          >
            <Icon.X strokeWidth={3} stroke="black" />
          </TouchableOpacity>
        </View>


                {/* Menu Section */}
                <View className="bg-white mt-5 px-4 py-6 rounded-t-3xl" style={{ width }}> 
          <Text className="text-2xl font-bold text-gray-800 mb-4">Menu</Text>
          
          {item.products.map((product, index) => (
            <Animated.View
              key={index}
              entering={FadeInUp.delay(100 * index).duration(600)}
              layout={Layout.springify()}
            >
              <ProductRow item={{ ...product }} key={index} />
            </Animated.View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
