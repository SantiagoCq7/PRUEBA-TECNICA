<script setup>
import { computed, onMounted } from 'vue'
import BooksHeader from '../components/BooksHeader.vue'
import BooksList from '../components/BooksList.vue'
import ReviewForm from '../components/ReviewForm.vue'
import FeedbackMessage from '../components/FeedbackMessage.vue'
import { useBooks } from '../composables/useBooks'
import { useCreateReview } from '../composables/useCreateReview'

const {
  books,
  hasBooks,
  isLoading,
  errorMessage,
  lastUpdated,
  refreshBooks,
} = useBooks()

const {
  reviewForm,
  isSubmitting,
  submitMessage,
  submitError,
  submitReview,
} = useCreateReview(refreshBooks)

const emptyStateVisible = computed(() => !isLoading.value && !errorMessage.value && !hasBooks.value)

onMounted(refreshBooks)
</script>

<template>
  <main class="shell">
    <section class="panel">
      <BooksHeader :is-loading="isLoading" @refresh="refreshBooks" />

      <p v-if="lastUpdated" class="meta">Ultima actualizacion: {{ lastUpdated }}</p>
      <FeedbackMessage :message="errorMessage" variant="error" />
      <FeedbackMessage v-if="isLoading" message="Consultando API..." />
      <FeedbackMessage v-else-if="emptyStateVisible" message="No hay libros para mostrar." />

      <BooksList v-if="hasBooks" :books="books" />

      <ReviewForm :model-value="reviewForm" :is-submitting="isSubmitting" @submit="submitReview" />
      <FeedbackMessage :message="submitMessage" variant="ok" />
      <FeedbackMessage :message="submitError" variant="error" />
    </section>
  </main>
</template>
