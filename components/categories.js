import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View, ScrollView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getCategories } from '../api';
import { urlFor } from '../sanity';
import ShopCard from './ShopCard';

export default function Categories() {
  const navigation = useNavigation();
  const [activeCategory, setActiveCategory] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then(data => {      
      setCategories(data);
    });
  }, []);

  const handleCategoryPress = (categoryId) => {
    navigation.navigate('ShopsByCategory', { categoryId }); // Chuyển đến ShopsByCategoryScreen với ID category
  };

  return (
    <View className="mt-4">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="overflow-visible"
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {categories.map((category, index) => {
          let isActive = category._id === activeCategory;
          let btnClass = isActive ? 'bg-gray-600' : 'bg-gray-200';
          let textClass = isActive ? 'font-semibold text-gray-800' : 'text-gray-500';

          return (
            <View key={index} className="mr-6">
              <TouchableOpacity
                className={`p-1 rounded-full shadow ` + btnClass}
                onPress={() => handleCategoryPress(category._id)}
              >
                <Image
                  style={{ width: 45, height: 45 }}
                  source={{ uri: urlFor(category.image).url() }}
                />
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}