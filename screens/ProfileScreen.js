import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, Alert, StyleSheet } from 'react-native';
import { firebase } from '../config';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import * as Icon from 'react-native-feather';
import mime from 'mime';
import { themeColors } from '../themes';

export default function ProfileScreen() {
  const [user, setUser] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserData = async () => {
      const currentUser = firebase.auth().currentUser;
      if (currentUser) {
        try {
          const document = await firebase.firestore().collection('users').doc(currentUser.uid).get();
          if (document.exists) {
            const userData = document.data();
            setUser(userData);
            setProfileImage(userData.profileImage);
          }
        } catch (error) {
          console.error("Error fetching user data: ", error);
        }
      }
    };

    fetchUserData();
  }, []);

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
  
      if (!result.cancelled) {
        const imageUri = result.uri || (result.assets && result.assets[0]?.uri); 
        if (imageUri) {
          await uploadImage(imageUri); 
        } else {
          console.error('No image URI found in the picker result.');
          Alert.alert('Error', 'Could not get the image URI. Please try again.');
        }
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error picking image', 'An error occurred while picking the image.');
    }
  };

  const uploadImage = async (uri) => {
    const currentUser = firebase.auth().currentUser;
    if (!currentUser) return;

    try {
      const response = await fetch(uri);
      const blob = await response.blob();

      const mimeType = mime.getType(uri);
      const fileExtension = mimeType.split('/')[1];
      const storageRef = firebase.storage().ref().child(`profileImages/${currentUser.uid}.${fileExtension}`);

      const uploadTask = storageRef.put(blob);

      uploadTask.on(
        'state_changed',
        (snapshot) => {},
        (error) => {
          Alert.alert('Error uploading image', error.message);
        },
        async () => {
          const downloadURL = await storageRef.getDownloadURL();
          updateUserProfileImage(downloadURL);
        }
      );
    } catch (error) {
      console.error('Error uploading image:', error);
      Alert.alert('Error uploading image', 'An error occurred while uploading the image.');
    }
  };

  const updateUserProfileImage = (downloadURL) => {
    const currentUser = firebase.auth().currentUser;
    if (!currentUser) return;

    firebase.firestore().collection('users')
      .doc(currentUser.uid)
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

  const logout = () => {
    firebase.auth().signOut()
      .then(() => {
        navigation.reset({
          index: 0,
          routes: [{ name: 'LoginScreen' }],
        });
      })
      .catch((error) => {
        Alert.alert('Error logging out', error.message);
      });
  };

  if (!user) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <TouchableOpacity className="bg-yellow-400 p-2 rounded-tr-2xl rounded-bl-2xl ml-4" onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon.ArrowLeft strokeWidth={3} stroke={themeColors.bgColor(1)} />
        </TouchableOpacity>
        <TouchableOpacity onPress={pickImage} style={styles.profileImageContainer}>
          {profileImage ? (
            <Image source={{ uri: profileImage }} style={styles.profileImage} />
          ) : (
            <View style={styles.profileImagePlaceholder}>
              <Text style={styles.profileImageText}>Add Image</Text>
            </View>
          )}
        </TouchableOpacity>
        <Text style={styles.info}>First Name: {user.firstName}</Text>
        <Text style={styles.info}>Last Name: {user.lastName}</Text>
        <Text style={styles.info}>Email: {user.email}</Text>
        <TouchableOpacity onPress={logout} style={styles.logoutButton}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  safeArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  profileImageContainer: {
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  profileImagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImageText: {
    color: '#888',
  },
  info: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  logoutButton: {
    marginTop: 20,
    backgroundColor: '#00c4d0',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
