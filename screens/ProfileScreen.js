import React, { useState, useEffect, useCallback } from "react";
import { View, Text, TouchableOpacity, Image, TextInput, Alert, ScrollView } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { firebase } from "../config";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Icon from "react-native-feather";
import { themeColors } from "../themes";

export default function ProfileScreen() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const navigation = useNavigation();

  const fetchUserData = async () => {
    try {
      const userString = await AsyncStorage.getItem('user');
      console.log("Fetched userString from AsyncStorage:", userString); 
      const user = userString ? JSON.parse(userString) : null;
      console.log("Parsed user data:", user); 
      if (user != null) {
        setEmail(user.email);
        const doc = await firebase.firestore().collection('users').doc(user.uid).get();
        if (doc.exists) {
          const data = doc.data();
          setFirstName(data.firstName);
          setLastName(data.lastName);
          setProfileImage(data.profileImage);
        } else {
          console.log("No document found for user");
        }
      } else {
        console.log("No user found in AsyncStorage");
      }
    } catch (error) {
      console.error("Error fetching user data: ", error);
    }
  };
  

  useFocusEffect(
    useCallback(() => {
      fetchUserData();
    }, [])
  );

  const handleImagePick = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
  
      if (!result.cancelled) {
        const userString = await AsyncStorage.getItem('user');
        if (userString) {
          const user = JSON.parse(userString);
          const uid = user.uid;
          const imageUri = result.uri || (result.assets && result.assets[0]?.uri); 
          if (imageUri) {
            await uploadImage(imageUri, uid); 
          } else {
            console.error('No image URI found in the picker result.');
            Alert.alert('Error', 'Could not get the image URI. Please try again.');
          }
        } else {
          Alert.alert("User data not found in AsyncStorage!");
        }
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error picking image', 'An error occurred while picking the image.');
    }
  };
  

  const uploadImage = async (uri, uid) => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
  
      const storageRef = firebase.storage().ref().child(`profileImages/${uid}`);
  
      const uploadTask = storageRef.put(blob);
  
      uploadTask.on(
        'state_changed',
        (snapshot) => {
        },
        (error) => {
          Alert.alert('Error uploading image', error.message);
        },
        async () => {
          const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
          updateUserProfileImage(downloadURL, uid);
        }
      );
    } catch (error) {
      console.error('Error uploading image:', error);
      Alert.alert('Error uploading image', 'An error occurred while uploading the image.');
    }
  };
  

  const updateUserProfileImage = (downloadURL, uid) => {
    firebase.firestore().collection('users')
      .doc(uid)
      .update({
        profileImage: downloadURL,
      })
      .then(() => {
        setProfileImage(downloadURL);
        Alert.alert('Profile image updated successfully');
      })
      .catch((error) => {
        Alert.alert('Error updating profile image', error.message);
      });
  };
  


  const handleUpdateProfile = async () => {
    try {
      const userString = await AsyncStorage.getItem('user');
      // console.log("Fetched userString from AsyncStorage:", userString);  
      const user = userString ? JSON.parse(userString) : null;
      // console.log("Parsed user data:", user);
      if (user != null){
        await firebase.firestore().collection('users').doc(user.uid).update({
          firstName,
          lastName,
          email,
        });
        Alert.alert("Profile updated successfully!");
      }else{
        console.log("No user found in AsyncStorage");
      }
    } catch (error) {
      Alert.alert("Error updating profile:", error.message);
    }
  };

  const handleLogout = async () => {
    await firebase.auth().signOut();
    await AsyncStorage.setItem('isLoggedIn', JSON.stringify(false));
    await AsyncStorage.removeItem('user');
    navigation.navigate('Welcome');
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="p-4">
      <TouchableOpacity onPress={handleGoBack} >
          <Icon.ArrowLeft strokeWidth={3} stroke={themeColors.bgColor(1)} />
      </TouchableOpacity>
        <View className="flex-row justify-center mb-5">
          <TouchableOpacity onPress={handleImagePick}>
            <Image 
              source={profileImage ? { uri: profileImage } : require('../assets/images/profilePlaceholder.png')}
              style={{ width: 100, height: 100, borderRadius: 50 }}
            />
          </TouchableOpacity>
        </View>
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
            editable={false}
          />
          <TouchableOpacity className="py-3 bg-yellow-400 rounded-xl mt-5" onPress={handleUpdateProfile}>
            <Text className="font-xl font-bold text-center text-gray-700">Update Profile</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
