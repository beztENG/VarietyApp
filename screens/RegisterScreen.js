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

export default function RegisterScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const scrollViewRef = useRef(null); // Reference for the ScrollView


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

  const registerUser = async (email, password, firstName, lastName) => {
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      await firebase.auth().currentUser.sendEmailVerification({
        handleCodeInApp: true,
        url: 'https://varietyapp-90383.firebaseapp.com',
      });
      alert('Verification email sent');

      await firebase.firestore().collection('users')
        .doc(firebase.auth().currentUser.uid)
        .set({
          firstName,
          lastName,
          email,
          profileImage: null,
        });
      navigation.navigate('LoginScreen');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior="padding"
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
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
              <Icon.ArrowLeft strokeWidth={3} stroke={themeColors.bgColor(1)} />
            </TouchableOpacity>
          </View>
          <View className="flex-row justify-center">
            <Image source={require("../assets/images/welcome.png")} style={{ width: 200, height: 200 }} />
          </View>
        </SafeAreaView>
        <View className="flex-1 bg-white px-8 pl-8" style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}>
          <View className="form space-y-2">
            <Text className="text-gray-700 ml-4">First Name:</Text>
            <TextInput
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
              placeholder="First Name"
              value={firstName}
              onChangeText={setFirstName}
            />
            <Text className="text-gray-700 ml-4">Last Name:</Text>
            <TextInput
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
              placeholder="Last Name"
              value={lastName}
              onChangeText={setLastName}
            />
            <Text className="text-gray-700 ml-4">Email Address:</Text>
            <TextInput
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
            />
            <Text className="text-gray-700 ml-4">Password:</Text>
            <TextInput
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl"
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <TouchableOpacity
              className="py-3 bg-yellow-400 rounded-xl mt-5"
              onPress={() => registerUser(email, password, firstName, lastName)}
            >
              <Text className="font-xl font-bold text-center text-gray-700">Register</Text>
            </TouchableOpacity>
            <View className="flex-row justify-center mt-7">
              <Text className="text-gray-500 font-semibold">Already have an account?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
                <Text className="font-semibold text-yellow-500"> Log In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}