import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Icon from 'react-native-feather';

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
import HistoryPurchaseScreen from './screens/HistoryPurchaseScreen';
import SettingsScreen from './screens/SettingsScreen';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="Home Screen"
        component={HomeScreen}
        options={{
          headerShown: false,
          drawerIcon: () => <Icon.Home/>,
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          headerShown: false,
          drawerIcon: () => <Icon.Settings/>,
        }}
      />
      <Drawer.Screen
        name="HistoryPurchase"
        component={HistoryPurchaseScreen}
        options={{
          headerShown: false,
          drawerIcon: () => <Icon.Archive/>,
        }}
      />
    </Drawer.Navigator>
  );
};

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
        return subscriber;
      }
    };

    checkUser();
  }, []);

  if (initializing) return null;

  if (!user) {
    return (
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
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
            headerShown: false
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
            headerShown: false
          }}
        />
      </Stack.Navigator>
    );
  }

  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={DrawerNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="Shop" component={ShopScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Cart" options={{ presentation: 'modal', headerShown: false }} component={CartScreen} />
      <Stack.Screen name="AllShopsScreen" component={AllShopsScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ShopsByCategory" component={ShopsByCategoryScreen} options={{ headerShown: false }} />
      <Stack.Screen name="OrderPreparing" options={{ presentation: 'fullScreenModal', headerShown: false }} component={OrderPreparingScreen} />
      <Stack.Screen name="Delivery" options={{ presentation: 'fullScreenModal', headerShown: false }} component={DeliveryScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Location" options={{ presentation: 'modal', headerShown: false }} component={LocationScreen} />
      <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="HistoryPurchase" component={HistoryPurchaseScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Settings" component={DrawerNavigator} options={{ headerShown: false }} />

    </Stack.Navigator>
  );
}
