<script setup>
defineProps({
  isLoading: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['refresh'])
</script>

<template>
  <div class="panel__header">
    <div>
      <p class="eyebrow">Prueba Tecnica</p>
      <h1>Catalogo de Libros</h1>
      <p class="lede">Vista Vue 3 consumiendo <strong>GET /api/books</strong> desde Symfony.</p>
    </div>

    <button class="refresh" type="button" :disabled="isLoading" @click="$emit('refresh')">
      {{ isLoading ? 'Cargando...' : 'Refrescar lista' }}
    </button>
  </div>
</template>
