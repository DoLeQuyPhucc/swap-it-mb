import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { fetchAllBooks } from './HomeApi';
import { useNavigation } from '@/hooks/useNavigation';
import { useFavorite } from '@/context/FavoriteContext';

export interface Book {
  id: string;
  bookName: string;
  authorName: string;
  image: string;
  address: string;
}

const HomeScreen = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const navigation = useNavigation();
  const { favorites, toggleFavorite } = useFavorite();

  useEffect(() => {
    const loadBooks = async () => {
      const fetchedBooks = await fetchAllBooks();
      setBooks(fetchedBooks);
    };
    loadBooks();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        {/* Header section with search bar and notification icon */}
        <View style={styles.header}>
          <TextInput
            style={styles.searchBar}
            placeholder="Search books..."
          />
          <TouchableOpacity>
            <Ionicons name="notifications-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>

        {/* Banner section */}
        <View style={styles.banner}>
          <Image
            source={{ uri: 'https://salt.tikicdn.com/ts/brickv2og/5a/eb/43/b6757b308e0195aaad79d8dd19d88fc2.jpg' }}
            style={styles.bannerImage}
            resizeMode="cover"
          />
        </View>

        {/* Filter section */}
        <View style={styles.filterSection}>
          <TouchableOpacity style={styles.filterIcon}>
            <MaterialIcons name="menu-book" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterIcon}>
            <MaterialIcons name="book" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterIcon}>
            <MaterialIcons name="local-library" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterIcon}>
            <MaterialIcons name="bookmark" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterIcon}>
            <MaterialIcons name="auto-stories" size={24} color="black" />
          </TouchableOpacity>
        </View>

        {/* Book cards section */}
        <View style={styles.bookGrid}>
          {books.map((book) => (
            <TouchableOpacity
              key={book.id}
              style={styles.bookCard}
              onPress={() => navigation.navigate('DetailScreen', { book })}
            >
              <Image source={{ uri: book.image }} style={styles.bookImage} />
              <View style={styles.bookInfo}>
                <Text style={styles.bookTitle}>{book.bookName}</Text>
                <Text style={styles.bookAuthor}>{book.authorName}</Text>
                <View style={styles.bookLocation}>
                  <Ionicons name="location-outline" size={16} color="gray" />
                  <Text style={styles.locationText}>{book.address}</Text>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => toggleFavorite(book.id)}
                style={styles.favoriteIcon}
              >
                <Ionicons
                  name={favorites.includes(book.id) ? "heart" : "heart-outline"}
                  size={24}
                  color={favorites.includes(book.id) ? "red" : "black"}
                />
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  searchBar: {
    flex: 1,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 12,
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  banner: {
    marginBottom: 20,
  },
  bannerImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  filterSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  filterIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  bookGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  bookCard: {
    backgroundColor: '#fff',
    width: '48%',  // Ensure two cards per row
    borderRadius: 10,
    padding: 10,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  bookImage: {
    width: '100%',
    height: 120,
    borderRadius: 10,
    marginBottom: 10,
  },
  bookInfo: {
    marginBottom: 10,
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  bookAuthor: {
    color: '#555',
    fontSize: 14,
    marginBottom: 4,
  },
  bookLocation: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 12,
    color: 'gray',
    marginLeft: 4,
  },
  favoriteIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});
