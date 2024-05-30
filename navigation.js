import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import HomeScreen from './screens/HomeScreen';
import ShopScreen from './screens/ShopScreen';
import CartScreen from './screens/CartScreen';
import OrderPreparingScreen from './screens/OrderPreparingScreen';
import DeliveryScreen from './screens/DeliveryScreen';
import AllShopsScreen from './screens/AllShopsScreen';
import ShopsByCategoryScreen from './screens/ShopsByCategoryScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import LocationScreen from './screens/LocationScreen';
import { firebase } from './config';
import Header from './components/header';

const Stack = createNativeStackNavigator();

export default function Navigation() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  const onAuthStateChanged = async (user) => {
    setUser(user);
    if (user) {
      await AsyncStorage.setItem('user', JSON.stringify(user));
    } else {
      await AsyncStorage.removeItem('user');
    }
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const checkUser = async () => {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
        setInitializing(false);
      } else {
        const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
      }
    };

    checkUser();
  }, []);

  if (initializing) return null;

  if (!user) {
    return (
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen 
          name="Register" 
          component={RegisterScreen} 
          options={{
            headerTitle: () => <Header name="Zinh" />,
            headerStyle: {
              height: 150,
              borderBottomLeftRadius: 50,
              borderBottomRightRadius: 50,
              backgroundColor: '#00c4d0',
              shadowColor: '#000',
              elevation: 25,
            },
          }}
        />
        <Stack.Screen 
          name="ForgotPassword" 
          component={ForgotPasswordScreen} 
          options={{
            headerTitle: () => <Header name="Zinh" />,
            headerStyle: {
              height: 150,
              borderBottomLeftRadius: 50,
              borderBottomRightRadius: 50,
              backgroundColor: '#00c4d0',
              shadowColor: '#000',
              elevation: 25,
            },
          }}
        />
      </Stack.Navigator>
    );
  }

  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Shop" component={ShopScreen} />
      <Stack.Screen name="Cart" options={{ presentation: 'modal' }} component={CartScreen} />
      <Stack.Screen name="AllShopsScreen" component={AllShopsScreen} />
      <Stack.Screen name="ShopsByCategory" component={ShopsByCategoryScreen} />
      <Stack.Screen name="OrderPreparing" options={{ presentation: 'fullScreenModal' }} component={OrderPreparingScreen} />
      <Stack.Screen name="Delivery" options={{ presentation: 'fullScreenModal' }} component={DeliveryScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Location" options={{ presentation: 'modal' }} component={LocationScreen} />
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
    </Stack.Navigator>
  );
}
