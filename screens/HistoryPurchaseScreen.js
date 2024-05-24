// HistoryPurchaseScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { firebase } from '../config';
export default function HistoryPurchaseScreen() {
  const [purchaseHistory, setPurchaseHistory] = useState([]);

  useEffect(() => {
      const fetchPurchaseHistory = async () => {
          try {
              // Get user ID from Firebase authentication
              const userId = firebase.auth().currentUser.uid;

              // Fetch purchase history data from Firebase
              const snapshot = await firebase.database().ref('purchaseHistory').orderByChild('userId').equalTo(userId).once('value');
              const data = snapshot.val();

              if (data) {
                  // Convert data object into array
                  const historyArray = Object.values(data);
                  setPurchaseHistory(historyArray);
              }
          } catch (error) {
              console.error('Error fetching purchase history:', error);
          }
      };

      fetchPurchaseHistory();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Purchase History</Text>
      <FlatList
        data={purchaseHistory}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.shopName}>{item.shop.name}</Text>
            <Text style={styles.shopAddress}>{item.shop.address}</Text>
            <Text style={styles.userLocation}>
              Your Location: {item.userLocation.latitude}, {item.userLocation.longitude}
            </Text>
            {item.items.map((product, index) => (
              <View key={index} style={styles.product}>
                <Text style={styles.productName}>{product.productName}</Text>
                <Text style={styles.productQuantity}>Quantity: {product.quantity}</Text>
              </View>
            ))}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  item: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
  },
  shopName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  shopAddress: {
    fontSize: 16,
    color: '#555',
  },
  userLocation: {
    fontSize: 14,
    color: '#888',
  },
  product: {
    marginTop: 10,
  },
  productName: {
    fontSize: 16,
  },
  productQuantity: {
    fontSize: 14,
    color: '#555',
  },
});
