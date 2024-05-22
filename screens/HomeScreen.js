import React, { useEffect, useState } from 'react';
import { Text, View, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as Icon from "react-native-feather";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { themeColors } from '../themes';
import Categories from '../components/categories';
import FeaturedRow from '../components/featuredRow';
import { getFeaturedShops } from '../api';

export default function HomeScreen() {
  const [featuredShops, setFeaturedShops] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    getFeaturedShops().then(data => {
      setFeaturedShops(data);
    });
  }, []);

  const handleSearch = (text) => {
    setSearchQuery(text);
  };

  const filterShopsByName = (shops, query) => {
    return shops.filter(shop => shop.name.toLowerCase().includes(query.toLowerCase()));
  };

  return (
    <SafeAreaView className="bg-white h-full">
      <StatusBar barStyle="dark-content" />
      <View className="p-4 border-b border-gray-300">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center border rounded-full overflow-hidden flex-1 mr-4">
            <Icon.Search height="25" width="25" stroke="gray" className="ml-3" />
            <TextInput
              placeholder="Search shops"
              className="flex-1 ml-2 py-2 px-3"
              value={searchQuery}
              onChangeText={handleSearch}
            />
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Icon.User height="25" width="25" stroke="gray" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Main */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 20,
          paddingHorizontal: 10,
        }}
      >
        {/* Categories */}
        <Categories />

        {/* Featured */}
        <View className="mt-5">
          {featuredShops.map((item, index) => {
            const filteredShops = filterShopsByName(item.shops, searchQuery);
            if (filteredShops.length > 0) {
              return (
                <FeaturedRow
                  key={index}
                  title={item.name}
                  shops={filteredShops}
                  description={item.description}
                />
              );
            } else {
              return null;
            }
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
