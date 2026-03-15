import { Pressable, StyleSheet, Text, View } from 'react-native';

type Props = {
  isLoading: boolean;
  onRefresh: () => void;
};

export function BooksHeader({ isLoading, onRefresh }: Props) {
  return (
    <View style={styles.header}>
      <Text style={styles.eyebrow}>Prueba Tecnica</Text>
      <Text style={styles.heading}>Biblioteca API</Text>
      <Text style={styles.subtitle}>React Native consumiendo GET /api/books</Text>
      <Pressable onPress={onRefresh} style={styles.button}>
        <Text style={styles.buttonText}>{isLoading ? 'Cargando...' : 'Refrescar'}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 8,
  },
  eyebrow: {
    textTransform: 'uppercase',
    letterSpacing: 2,
    fontSize: 12,
    color: '#8a5b28',
    marginBottom: 8,
  },
  heading: {
    fontSize: 32,
    fontWeight: '700',
    color: '#2f1d10',
  },
  subtitle: {
    marginTop: 6,
    marginBottom: 16,
    color: '#6b523a',
  },
  button: {
    alignSelf: 'flex-start',
    backgroundColor: '#3c2715',
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  buttonText: {
    color: '#fff8ef',
    fontWeight: '600',
  },
});
