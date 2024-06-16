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
      <View className="px-4 py-5 bg-green-500 shadow-md"> 
        <Text className="text-white text-2xl font-bold text-center">Order History</Text>
      </View>

      <TouchableOpacity
          onPress={() => navigation.openDrawer()}
          className="absolute top-5 left-2 bg-gray-200 p-2 rounded-full shadow"
          style={{top: 40, left: 15}}
        >
          <Icon.Menu strokeWidth={3} stroke={themeColors.bgColor(1)} />
        </TouchableOpacity>

      <ScrollView className="px-4 pt-5">
        {orders.map((order, index) => (
          <View 
            key={index} 
            className="mb-4 p-4 bg-white rounded-lg shadow-md" 
          >
            <View className="flex-row justify-between items-center mb-2">
              <Text className="font-bold text-lg text-gray-800">#{index + 1} Order from {order.shopName}</Text>
              <Text className="text-green-500">${order.total}</Text> 
            </View>
            <Text className="text-gray-600 mb-2">{order.address}</Text>
            <Text className="text-gray-500">{order.timestamp.toLocaleDateString()}</Text>

            {order.items.map((item, idx) => (
              <View key={idx} className="flex-row items-center mt-2">
                <Image 
                  source={{ uri: item.image }} 
                  className="w-12 h-12 rounded-full mr-2"
                />
                <Text className="text-gray-700">{item.name} x {item.quantity}</Text>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
