import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { BookCard } from '../components/BookCard';
import { BooksHeader } from '../components/BooksHeader';
import { useBooks } from '../hooks/useBooks';

export function BooksScreen() {
  const { books, isLoading, errorMessage, loadBooks } = useBooks();

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar style="dark" />
      <BooksHeader isLoading={isLoading} onRefresh={() => void loadBooks()} />

      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}

      {isLoading ? (
        <View style={styles.loaderWrap}>
          <ActivityIndicator size="large" color="#5b3a22" />
        </View>
      ) : (
        <FlatList
          data={books}
          keyExtractor={(item) => `${item.title}-${item.author}`}
          renderItem={({ item }) => <BookCard book={item} />}
          contentContainerStyle={styles.list}
          onRefresh={() => void loadBooks()}
          refreshing={isLoading}
          ListEmptyComponent={<Text style={styles.empty}>No hay libros para mostrar.</Text>}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f4eadf',
  },
  loaderWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    padding: 20,
    gap: 14,
  },
  error: {
    marginHorizontal: 20,
    marginTop: 8,
    color: '#8f2217',
    backgroundColor: '#f8d8d2',
    borderRadius: 12,
    padding: 12,
  },
  empty: {
    textAlign: 'center',
    color: '#6b523a',
    paddingVertical: 24,
  },
});
