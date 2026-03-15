import { ref } from 'vue'
import { createReview } from '../api/booksApi'

export function useCreateReview(onSuccess) {
  const reviewForm = ref({
    book_id: '',
    rating: 5,
    comment: '',
  })

  const isSubmitting = ref(false)
  const submitMessage = ref('')
  const submitError = ref('')

  async function submitReview() {
    submitMessage.value = ''
    submitError.value = ''
    isSubmitting.value = true

    try {
      const payload = {
        book_id: Number(reviewForm.value.book_id),
        rating: Number(reviewForm.value.rating),
        comment: reviewForm.value.comment.trim(),
      }

      await createReview(payload)
      submitMessage.value = 'Resena creada correctamente.'
      reviewForm.value.comment = ''
      reviewForm.value.rating = 5

      if (typeof onSuccess === 'function') {
        await onSuccess()
      }
    } catch (error) {
      submitError.value = error instanceof Error
        ? error.message
        : 'No se pudo crear la resena.'
    } finally {
      isSubmitting.value = false
    }
  }

  return {
    reviewForm,
    isSubmitting,
    submitMessage,
    submitError,
    submitReview,
  }
}
