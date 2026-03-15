import { StyleSheet, Text, View } from 'react-native';
import type { Book } from '../types/book';

type Props = {
  book: Book;
};

export function BookCard({ book }: Props) {
  const average =
    book.average_rating === null
      ? 'Sin reseñas'
      : Number(book.average_rating).toFixed(2);

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{book.title}</Text>
      <Text style={styles.author}>{book.author}</Text>
      <View style={styles.metaRow}>
        <Text style={styles.meta}>Anio: {book.published_year}</Text>
        <Text style={styles.meta}>Calificacion: {average}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fffaf3',
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: '#e5d3bf',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2f1d10',
  },
  author: {
    marginTop: 6,
    color: '#6b523a',
    fontSize: 16,
  },
  metaRow: {
    marginTop: 14,
    gap: 6,
  },
  meta: {
    color: '#4a3524',
  },
});
