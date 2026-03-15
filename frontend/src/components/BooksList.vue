<script setup>
defineProps({
  books: {
    type: Array,
    required: true,
  },
})

function formatRating(value) {
  if (value === null) {
    return 'Sin resenas'
  }

  return Number(value).toFixed(2)
}
</script>

<template>
  <ul class="book-list">
    <li v-for="book in books" :key="book.id" class="book-card">
      <div>
        <p class="book-card__id">ID: {{ book.id }}</p>
        <p class="book-card__title">{{ book.title }}</p>
        <p class="book-card__author">{{ book.author }}</p>
      </div>

      <dl class="book-card__stats">
        <div>
          <dt>Año</dt>
          <dd>{{ book.published_year }}</dd>
        </div>
        <div>
              <dt>Calificacion promedio</dt>
          <dd>{{ formatRating(book.average_rating) }}</dd>
        </div>
      </dl>
    </li>
  </ul>
</template>
