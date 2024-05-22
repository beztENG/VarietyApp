import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';

import HomeScreen from './screens/HomeScreen';
import ShopScreen from './screens/ShopScreen';
import CartScreen from './screens/CartScreen';
import OrderPreparingScreen from './screens/OrderPreparingScreen';
import DeliveryScreen from './screens/DeliveryScreen';
import AllShopsScreen from './screens/AllShopsScreen';
import ShopsByCategoryScreen from './screens/ShopsByCategoryScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import { firebase } from './config';
import Header from './components/header';
import ProfileScreen from './screens/ProfileScreen';
import LocationScreen from './screens/LocationScreen';


const Stack = createNativeStackNavigator();

export default function Navigation() {
  const [initializing, setInitializing] = useState(true);
  const[user, setUser] = useState();
  function onAuthStateChanged(user){
    setUser(user) 
    if(initializing) setInitializing(false)
  }

  useEffect(() =>{
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, [])

  if(initializing) return null;

  if(!user){
    return(
      <Stack.Navigator>
            <Stack.Screen 
            name="LoginScreen" 
            component={LoginScreen} 
            options={{
              headerTitle: () => <Header name="Zinh"/>,
              headerStyle: {
                height: 150,
                borderBottomLeftRadius:  50,
                borderBottomRightRadius: 50,
                backgroundColor: '#00c4d0',
                shadowColor: '#000',
                elevation: 25
              }
            }}
            />
            <Stack.Screen 
            name="Register" 
            component={RegisterScreen} 
            options={{
              headerTitle: () => <Header name="Zinh"/>,
              headerStyle: {
                height: 150,
                borderBottomLeftRadius:  50,
                borderBottomRightRadius: 50,
                backgroundColor: '#00c4d0',
                shadowColor: '#000',
                elevation: 25
              }
            }}
            />
      </Stack.Navigator>
    );
  }
  
  return(
    <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Shop" component={ShopScreen} />
          <Stack.Screen name="Cart" options={{presentation: 'modal'}} component={CartScreen} />
          <Stack.Screen name="AllShopsScreen" component={AllShopsScreen} />
          <Stack.Screen name="ShopsByCategory" component={ShopsByCategoryScreen}/>
          <Stack.Screen name="OrderPreparing" options={{presentation: 'fullScreenModal'}} component={OrderPreparingScreen} />
          <Stack.Screen name="Delivery" options={{presentation: 'fullScreenModal'}} component={DeliveryScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} /> 
          <Stack.Screen name="Profile" component={ProfileScreen}/>
          <Stack.Screen name="Location" options={{presentation: 'modal'}}  component={LocationScreen} />
    </Stack.Navigator>
  );
}

