import React, { useState, useRef, useEffect } from "react";import { 
  View, 
  Text, 
  TouchableOpacity, 
  TextInput, 
  Image, 
  KeyboardAvoidingView, 
  Platform, 
  ScrollView,
  Keyboard, 
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { firebase } from "../config";
import { themeColors } from "../themes";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Icon from "react-native-feather";

export default function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const scrollViewRef = useRef(null); // Reference for the ScrollView

  const loginUser = async (email, password) => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      navigation.navigate('Home');
    } catch (error) {
      alert(error.message);
    }
  };

    // Scroll to the bottom when the keyboard appears
    useEffect(() => {
      const keyboardDidShowListener = Keyboard.addListener(
        'keyboardDidShow',
        () => {
          scrollViewRef.current?.scrollToEnd({ animated: true }); // Scroll to the end
        }
      );
  
      return () => keyboardDidShowListener.remove();
    }, []);

  return (
    <KeyboardAvoidingView 
      behavior="padding"
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
      className="flex-1 bg-white" style={{ backgroundColor: themeColors.bgColor(1) }}>
      <ScrollView 
        ref={scrollViewRef} // Attach the reference to the ScrollView
        contentContainerStyle={{ flexGrow: 1 }}>
        <SafeAreaView className="flex">
          <View className="flex-row justify-start">
            <TouchableOpacity 
              onPress={() => navigation.navigate('Welcome')}
              className="bg-yellow-400 p-2 rounded-tr-2xl rounded-bl-2xl ml-4"
            >
              <Icon.ArrowLeft strokeWidth={3} stroke={themeColors.bgColor(1)}/>
            </TouchableOpacity>
          </View>
          <View className="flex-row justify-center">
            <Image source={require("../assets/images/welcome.png")} style={{width: 200, height: 200}}/>
          </View>
        </SafeAreaView>
        <View className="flex-1 bg-white px-8 pl-8" style = {{borderTopLeftRadius: 50, borderTopRightRadius: 50}}>
          <View className="form space-y-2">
            <Text className="text-gray-700 ml-4">Email Address : </Text>
            <TextInput
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
            />
            <Text className="text-gray-700 ml-4">Password : </Text>
            <TextInput
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl"
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <TouchableOpacity className="flex items-end mb-5" onPress={() => navigation.navigate('ForgotPassword')}>
              <Text className="text-gray-700">Forgot your password?</Text>
            </TouchableOpacity>
            <TouchableOpacity className="py-3 bg-yellow-400 rounded-xl" onPress={() => loginUser(email, password)}>
              <Text className="font-xl font-bold text-center text-gray-700">Login</Text>
            </TouchableOpacity>
            <View className="flex-row justify-center mt-7">
              <Text className="text-gray-500 font-semibold">Don't have any account ?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text className="font-semibold text-yellow-500">Register</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};