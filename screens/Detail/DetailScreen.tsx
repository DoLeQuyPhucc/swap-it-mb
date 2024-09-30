import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFavorite } from '@/context/FavoriteContext';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@/layouts/types/navigationTypes';
import { SafeAreaView } from 'react-native';

type DetailScreenRouteProp = RouteProp<RootStackParamList, 'DetailScreen'>;

interface DetailScreenProps {
  route: DetailScreenRouteProp;
}

const DetailScreen: React.FC<DetailScreenProps> = ({ route }) => {
  const { book } = route.params;
  const { favorites, toggleFavorite } = useFavorite();
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Book Detail</Text>
      </View>
      <View style={styles.container}>
        <Image source={{ uri: book.image }} style={styles.bookImage} />
        <View style={styles.bookInfo}>
          <Text style={styles.bookTitle}>{book.bookName}</Text>
          <Text style={styles.bookAuthor}>{book.authorName}</Text>
          <View style={styles.bookLocation}>
            <Ionicons name="location-outline" size={16} color="gray" />
            <Text style={styles.locationText}>{book.address}</Text>
          </View>
          <TouchableOpacity
            onPress={() => toggleFavorite(book.id)}
            style={styles.favoriteButton}
          >
            <Ionicons
              name={favorites.includes(book.id) ? "heart" : "heart-outline"}
              size={30}
              color={favorites.includes(book.id) ? "red" : "black"}
            />
            <Text>
              {favorites.includes(book.id) ? "Remove from Favorites" : "Add to Favorites"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  bookImage: {
    width: '100%',
    height: 300,
    borderRadius: 10,
  },
  bookInfo: {
    marginTop: 20,
  },
  bookTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  bookAuthor: {
    fontSize: 18,
    color: '#555',
    marginVertical: 10,
  },
  bookLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  locationText: {
    fontSize: 14,
    color: 'gray',
    marginLeft: 4,
  },
  favoriteButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
