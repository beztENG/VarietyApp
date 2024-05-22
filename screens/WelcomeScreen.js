import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { themeColors } from "../themes";

export default function WelcomeScreen(){
    const navigation = useNavigation();
    return(
        <SafeAreaView className="flex-1" style={{backgroundColor: themeColors.bgColor(1)}}>    
            <View className="flex-1 flex justify-around my-4">
                <Text className="text-white font-bold text-4xl text-center">
                    Let's Get Started!
                </Text>
                <View className="flex-row justify-center">
                    <Image source={require("../assets/images/welcome.png")}
                        style={{width: 350, height: 350}}
                    />
                </View>

                <View className="space-y-4">
                    <TouchableOpacity onPress={()=> navigation.navigate('Register')} className="py-3 bg-yellow-400 mx-7 rounded-xl">
                        <Text className="text-xl font-bold text-center text-gray-700">
                            Register
                        </Text>
                    </TouchableOpacity>
                    <View className="flex-row justify-center">
                        <Text className="text-white font-semibold">Already have an account ?</Text>
                        <TouchableOpacity onPress={()=> navigation.navigate('LoginScreen')}>
                            <Text className="font-semibold text-yellow-400">Log In</Text>
                        </TouchableOpacity>
                    </View>
                </View>


            </View>
        </SafeAreaView>
    )
}