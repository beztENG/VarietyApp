import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { firebase } from "../config";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";
import * as Icon from "react-native-feather";
import { themeColors } from "../themes";

export default function HistoryPurchaseScreen() {
  const [orders, setOrders] = useState([]); 
  const navigation = useNavigation();

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

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="p-4 border-b border-gray-300">
        <Text className="text-2xl font-bold text-center">Order History</Text>
      </View>
      <TouchableOpacity
        onPress={()=> navigation.goBack()}
        className="absolute top-14 left-4 bg-gray-50 p-2 rounded-full shadow"
        >
          <Icon.ArrowLeft strokeWidth={3} stroke={themeColors.bgColor(1)}/>
      </TouchableOpacity>
      <ScrollView className="flex-1 p-4">
        {orders.map((order, index) => (
          <View key={index} className="mb-4 p-4 border rounded-lg shadow-sm">
            <Text className="font-bold text-lg">Order from {order.shopName}</Text>
            <Text className="mt-2">Total: ${order.total}</Text>
            <Text className="mt-2">Address: {order.address}</Text>
            <Text className="mt-2">Date: {order.timestamp.toLocaleDateString()}</Text>
            <View className="mt-2">
              {order.items.map((item, idx) => (
                <View key={idx} className="flex-row items-center mb-2">
                  <Image source={{ uri: item.image }} className="w-12 h-12 mr-2 rounded" />
                  <Text className="text-gray-600">{item.name} x {item.quantity}</Text>
                </View>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
