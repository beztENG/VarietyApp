import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { firebase } from "../config";
import { themeColors } from "../themes";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Icon from "react-native-feather";

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const navigation = useNavigation();

  const sendPasswordResetEmail = async () => {
    try {
      await firebase.auth().sendPasswordResetEmail(email);
      alert('Password reset email sent! Please check your email.');
      navigation.navigate('LoginScreen');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View className="flex-1 bg-white" style={{ backgroundColor: themeColors.bgColor(1) }}>
      <SafeAreaView className="flex">
        <View className="flex-row justify-start">
          <TouchableOpacity
            onPress={() => navigation.navigate('Welcome')}
            className="bg-yellow-400 p-2 rounded-tr-2xl rounded-bl-2xl ml-4"
          >
            <Icon.ArrowLeft strokeWidth={3} stroke={themeColors.bgColor(1)} />
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-center">
          <Image source={require("../assets/images/welcome.png")} style={{ width: 200, height: 200 }} />
        </View>
      </SafeAreaView>
      <View className="flex-1 bg-white px-8 pl-8" style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}>
        <View className="form space-y-2">
          <Text className="text-gray-700 ml-4">Enter your email:</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
          <TouchableOpacity
            className="py-3 bg-yellow-400 rounded-xl mt-5"
            onPress={sendPasswordResetEmail}
          >
            <Text className="font-xl font-bold text-center text-gray-700">Send Email</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
