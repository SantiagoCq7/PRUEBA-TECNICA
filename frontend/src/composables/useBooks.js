import { computed, ref } from 'vue'
import { getBooks } from '../api/booksApi'

export function useBooks() {
  const books = ref([])
  const isLoading = ref(false)
  const errorMessage = ref('')
  const lastUpdated = ref('')

  const hasBooks = computed(() => books.value.length > 0)

  async function refreshBooks() {
    isLoading.value = true
    errorMessage.value = ''

    try {
      books.value = await getBooks()
      lastUpdated.value = new Date().toLocaleString()
    } catch (error) {
      books.value = []
      errorMessage.value = error instanceof Error
        ? error.message
        : 'No se pudo cargar la lista de libros.'
    } finally {
      isLoading.value = false
    }
  }

  return {
    books,
    hasBooks,
    isLoading,
    errorMessage,
    lastUpdated,
    refreshBooks,
  }
}
