import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Animated, Easing, SafeAreaView } from "react-native";
import { firebase } from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Icon from "react-native-feather";
import { LinearGradient } from 'expo-linear-gradient'; // Import for gradients
import { themeColors } from '../themes';

export default function SettingsScreen({ navigation }) {
  const [logoutButtonScale] = useState(new Animated.Value(1));
  const [historyButtonScale] = useState(new Animated.Value(1));

  const handleLogout = async () => {
    await firebase.auth().signOut();
    await AsyncStorage.setItem('isLoggedIn', JSON.stringify(false));
    await AsyncStorage.removeItem('user');
    navigation.navigate('Welcome'); 
  };

  const handleButtonPress = (animation) => {
    Animated.sequence([
      Animated.timing(animation, {
        toValue: 0.95,
        duration: 50,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(animation, {
        toValue: 1,
        duration: 150,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <LinearGradient colors={['#FFFFFF', '#A7F3D0']} style={{ flex: 1 }}>
      <SafeAreaView className="flex-1 items-center justify-center px-4">
        <TouchableOpacity
          onPress={() => navigation.openDrawer()}
          className="absolute top-5 left-2 bg-gray-200 p-2 rounded-full shadow"
          style={{top: 40, left: 15}}
        >
          <Icon.Menu strokeWidth={3} stroke={themeColors.bgColor(1)} />
        </TouchableOpacity>

        <Animated.View style={{ transform: [{ scale: logoutButtonScale }] }}>
          <TouchableOpacity
            onPress={() => { handleLogout(); handleButtonPress(logoutButtonScale); }}
            className="bg-white/20 w-full py-3 rounded-xl mb-4 shadow flex items-center justify-center"
          >
            <Icon.LogOut color="black" size={24} className="mr-2" />
            <Text className="text-black text-lg font-bold">Logout</Text>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View style={{ transform: [{ scale: historyButtonScale }] }}>
          <TouchableOpacity
            onPress={() => { navigation.navigate('HistoryPurchase'); handleButtonPress(historyButtonScale); }}
            className="bg-white/20 w-full py-3 rounded-xl shadow flex items-center justify-center"
          >
            <Icon.Clock color="black" size={24} className="mr-2" />
            <Text className="text-black text-lg font-bold">View Purchase History</Text>
          </TouchableOpacity>
        </Animated.View>
      </SafeAreaView>
    </LinearGradient>
  );
}
