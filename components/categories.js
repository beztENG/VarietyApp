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
    navigation.navigate('ShopsByCategory', { categoryId });
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
          const isActive = category._id === activeCategory;
          return (
            <TouchableOpacity
              key={index} 
              className="mr-6 flex items-center"
              onPress={() => {
                setActiveCategory(category._id); // Update active category
                handleCategoryPress(category._id);
              }}
            >
              <View 
                className={`p-2 rounded-full shadow-md `} 
                style={{ borderWidth: 2, borderColor: isActive ? 'transparent' : '#ddd' }} // Add border
              >
                <Image
                  style={{ width: 50, height: 50, borderRadius: 25 }} // Make image round
                  source={{ uri: urlFor(category.image).url() }}
                />
              </View>
              <Text className={`text-center mt-1 font-medium`}> 
                {category.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}
