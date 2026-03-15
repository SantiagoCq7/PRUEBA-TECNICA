import { API_BASE_URL } from '../config/apiConfig';
import type { Book } from '../types/book';

export async function fetchBooks(): Promise<Book[]> {
  const response = await fetch(`${API_BASE_URL}/api/books`);

  if (!response.ok) {
    throw new Error(`No se pudo consultar /api/books (estado HTTP ${response.status})`);
  }

  return response.json() as Promise<Book[]>;
}
