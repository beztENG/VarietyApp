import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import ShopCard2 from '../components/ShopCard2';
import { getShopsByCategory } from '../api'; // Import hàm lấy shop theo category
import { themeColors } from '../themes';

export default function ShopsByCategoryScreen({ route }) {
  const navigation = useNavigation();
  const { categoryId } = route.params; // Lấy ID category từ route.params
  console.log(route.params)
  const [shops, setShops] = useState([]); 
 
  useEffect(() => {
    const fetchShopsByCategory = async () => {
      const data = await getShopsByCategory(categoryId);
      setShops(data);
    };
    fetchShopsByCategory();
  }, [categoryId]); 

  const handleShopPress = (shop) => {
    navigation.navigate('Shop', { _id: shop._id }); // Chuyển đến ShopScreen với ID shop

  };

  return (
    <View style={{ flex: 1, backgroundColor: themeColors.bgColor() }}>
      <ScrollView contentContainerStyle={{ paddingVertical: 20, paddingHorizontal: 15 }}>
        <View >
          {shops.map((shop, index) => (
            <TouchableOpacity key={index} onPress={() => handleShopPress(shop)} style={{ marginBottom: 20 }}>
              <ShopCard2 item={shop} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}