import React from 'react';
import Navigation from './navigation';
import { Provider } from 'react-redux'
import { store } from './store';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {LogBox} from 'react-native'
import 'react-native-gesture-handler';

const Stack = createNativeStackNavigator();

export default function App() {
  LogBox.ignoreLogs([
    'Selector unknown returned a different result when called with the same parameters. This can lead to unnecessary rerenders.',
  ]);
  return (
    <NavigationContainer>
      <Provider store={store}>
        <Navigation/>
      </Provider>
    </NavigationContainer>

  );
}