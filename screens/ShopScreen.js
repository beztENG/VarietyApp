import { Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { themeColors } from '../themes';
import * as Icon from "react-native-feather";
import ProductRow from '../components/productRow';
import CartIcon from '../components/cartIcon';
import { StatusBar } from 'expo-status-bar';
import { useDispatch } from 'react-redux';
import { setShop } from '../redux/shopSlice';
import { urlFor } from '../sanity';

 
export default function ShopScreen(){
    const {params} = useRoute();
    const navigation = useNavigation();
    let item = params;
    const dispatch = useDispatch();
    // console.log('shop', item);
    useEffect(() => {
        if(item && item._id){ 
            dispatch(setShop({...item}))
        }
    }, [])
    return(
        <View>
            <CartIcon/>
            <StatusBar style="light"/>
            <ScrollView>
                <View className="relative">
                    <Image className="w-full h-72" source={{uri: urlFor(item.image).url()}}/>
                    <TouchableOpacity
                    onPress={()=> navigation.goBack()}
                    className="absolute top-14 left-4 bg-gray-50 p-2 rounded-full shadow"
                    >
                        <Icon.ArrowLeft strokeWidth={3} stroke={themeColors.bgColor(1)}/>
                    </TouchableOpacity>
                </View>
                <View
                    style={{borderTopLeftRadius: 40, BorderTopRightRadius: 40}}
                    className="bg-white -mt-12 pt-6"
                >
                    <View className="px-5">
                        <Text className="text-3xl font-bold">{item.name}</Text>
                        <View className="flex-row space-x-2 my-1">
                            <View className="flex-row items-center space-x-1">
                                <Image source={require('../assets/images/fullStar.png')} className="h-4 w-4"/>
                                <Text className="text-xs">
                                    <Text className="text-green-700">{item.stars}</Text>
                                    <Text className="text-gray-700">
                                    ({item.reviews} review) • <Text className="font-semibold">{item?.type?.name}</Text>
                                    </Text>
                                </Text>
                            </View>
                            <View className="flex-row items-center space-x-1">
                                <Icon.MapPin color="gray" width="15" height="15"/>
                                <Text className="text-gray-700 text-xs">{item.address}</Text>
                            </View>
                        </View>
                        <Text className="text-gray-500 mt-2">{item.description}</Text>
                    </View>
                </View>
                <View className="pb-36 bg-white">
                    <Text className="px-4 py-4 text-2xl font-bold">Menu</Text>
                    {/* Products */}
                    {
                        item.products.map((product, index) => <ProductRow item={{...product}} key={index}/>)
                    }
                </View>
            </ScrollView>
        </View>
    )
}