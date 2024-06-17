import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet, useWindowDimensions } from "react-native";
import { firebase } from "../config";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";
import * as Icon from "react-native-feather";
import { themeColors } from "../themes";
import Animated, { FadeInDown, Layout } from 'react-native-reanimated';

export default function HistoryPurchaseScreen() {
  const [orders, setOrders] = useState([]);
  const navigation = useNavigation();
  const { width } = useWindowDimensions();

  const fetchOrders = async () => { 
    try {
      const userString = await AsyncStorage.getItem('user');
      const user = userString ? JSON.parse(userString) : null;
      if (user) {
        const ordersSnapshot = await firebase.firestore()
          .collection('orders')
          .where('userId', '==', user.uid)
          .get();
        const fetchedOrders = ordersSnapshot.docs.map(doc => {
          const data = doc.data();
          data.timestamp = data.timestamp.toDate();
          return data;
        });
        setOrders(fetchedOrders);
      }
    } catch (error) {
      console.error("Error fetching orders: ", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const EmptyHistoryComponent = () => (
    <Animated.View 
      entering={FadeInDown.duration(1000).springify().damping(15)} 
      className="mt-20 items-center"
    >
      <Icon.ShoppingCart color={themeColors.bgColor(1)} size={80} style={{ opacity: 0.2 }} />
      <Text className="text-gray-500 text-xl mt-4">Your order history is empty.</Text>
    </Animated.View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="px-4 py-5 shadow-md" style={{width: width, height: 69}}>
        <View style={{ ...StyleSheet.absoluteFillObject, backgroundColor: '#FFFFFF' }} /> 
        <View style={{
          ...StyleSheet.absoluteFillObject, 
          backgroundColor: '#22c55e', // Vibrant Green
          opacity: 0.4
        }} />
        <Text className="absolute top-5 left-0 right-0 text-white text-2xl font-bold text-center">
          Order History
        </Text>
      </View>

      <TouchableOpacity
        onPress={() => navigation.openDrawer()}
        className="absolute top-5 left-2 bg-gray-200 p-2 rounded-full shadow"
        style={{ top: 40, left: 15 }}
      >
        <Icon.Menu strokeWidth={3} stroke="black" />
      </TouchableOpacity>

      <ScrollView className="px-4 pt-5">
        {orders.length === 0 ? (
          <EmptyHistoryComponent /> 
        ) : (
          orders.map((order, index) => (
            <Animated.View
              key={index}
              entering={FadeInDown.delay(index * 200).duration(800).springify().damping(15)}
              layout={Layout.springify()}
              className="mb-4 p-4 bg-white rounded-xl shadow-md border border-gray-100"
            >
              {/* Order Card Header */}
              <View className="flex-row justify-between items-center">
                <View className="flex-row items-center">
                  <Icon.Truck color="orange" width={20} height={20} />
                  <Text className="font-bold text-lg text-gray-800 ml-2">Order #{index + 1}</Text>
                </View>
                <Text className="text-green-500 font-semibold">${order.total.toFixed(2)}</Text> 
              </View>

              {/* Order Details */}
              <View className="mt-2">
                <Text className="text-gray-500">
                  {order.timestamp.toLocaleDateString()} - {order.shopName}
                </Text>
                <Text className="text-gray-600 mt-1">{order.address}</Text>
              </View>

              {/* Order Items */}
              {order.items.map((item, idx) => (
                <View key={idx} className="flex-row items-center mt-3">
                  <Image 
                    source={{ uri: item.image }} 
                    className="w-10 h-10 rounded-lg mr-2"
                  />
                  <Text className="text-gray-700">
                    {item.name} - x{item.quantity}
                  </Text>
                </View>
              ))}
            </Animated.View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
