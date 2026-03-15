import { useCallback, useEffect, useState } from 'react';
import { fetchBooks } from '../api/booksApi';
import type { Book } from '../types/book';

type UseBooksResult = {
  books: Book[];
  isLoading: boolean;
  errorMessage: string;
  loadBooks: () => Promise<void>;
};

export function useBooks(): UseBooksResult {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const loadBooks = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      const payload = await fetchBooks();
      setBooks(payload);
    } catch (error) {
      setBooks([]);
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'No se pudo cargar la API. Revisa la URL base y que Symfony este corriendo.'
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadBooks();
  }, [loadBooks]);

  return {
    books,
    isLoading,
    errorMessage,
    loadBooks,
  };
}
