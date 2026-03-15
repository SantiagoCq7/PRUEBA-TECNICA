<script setup>
defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
  isSubmitting: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['submit'])
</script>

<template>
  <section class="review-box">
    <h2>Crear resena</h2>
    <p class="review-box__hint">Este formulario consume <strong>POST /api/reviews</strong>.</p>

    <form class="review-form" @submit.prevent="$emit('submit')">
      <label>
        ID del libro
        <input v-model.number="modelValue.book_id" type="number" min="1" required />
      </label>

      <label>
        Calificacion
        <input v-model.number="modelValue.rating" type="number" min="1" max="5" required />
      </label>

      <label class="review-form__comment">
        Comentario
        <textarea v-model="modelValue.comment" rows="3" required></textarea>
      </label>

      <button class="submit" type="submit" :disabled="isSubmitting">
        {{ isSubmitting ? 'Guardando...' : 'Guardar resena' }}
      </button>
    </form>
  </section>
</template>
