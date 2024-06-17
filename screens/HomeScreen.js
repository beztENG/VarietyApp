import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image, TextInput } from "react-native";
import { StatusBar } from 'expo-status-bar';
import * as Icon from "react-native-feather";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from "@react-navigation/native";
import { themeColors } from '../themes';
import Categories from '../components/categories';
import FeaturedRow from '../components/featuredRow';
import { getFeaturedShops } from '../api';

export default function HomeScreen() {
  const [featuredShops, setFeaturedShops] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    getFeaturedShops().then(setFeaturedShops); 
  }, []);

  const handleSearch = (text) => setSearchQuery(text);
  const clearSearch = () => setSearchQuery('');

  const filterShopsByName = (shops, query) => shops.filter(
    shop => shop.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <SafeAreaView className="bg-white h-full">
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View className="px-4 pt-8 pb-4 flex-row items-center justify-between">
        {/* Menu Button */}
        <TouchableOpacity
          onPress={() => navigation.openDrawer()}
          className="p-2 rounded-full bg-gray-100 shadow"
        >
          <Icon.Menu strokeWidth={3} stroke="black" />
        </TouchableOpacity>

        {/* Logo (Replace placeholder with your app logo) */}
        <Image 
          source={require('../assets/logo.png')} 
          className="h-20 w-56"
          />

        {/* Profile Button */}
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Icon.User height="50" width="25" stroke="gray" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View className="px-4 mb-4">
        <View className="flex-row items-center bg-gray-100 rounded-full p-2 shadow-sm">
          <Icon.Search height="20" width="20" stroke="gray" className="mr-2" />
          <TextInput
            placeholder="Search for shops or dishes..."
            className="flex-1 text-gray-700"
            value={searchQuery}
            onChangeText={handleSearch}
          />
          {searchQuery !== '' && (
            <TouchableOpacity onPress={clearSearch}>
              <Icon.X height="20" width="20" stroke="gray" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Main Content */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20, paddingHorizontal: 10 }}
      >
        <Categories />

        <View className="mt-5">
          {featuredShops.map((item, index) => {
            const filteredShops = filterShopsByName(item.shops, searchQuery);
            return filteredShops.length > 0 ? (
              <FeaturedRow
                key={index}
                title={item.name}
                shops={filteredShops}
                description={item.description}
              />
            ) : null;
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
