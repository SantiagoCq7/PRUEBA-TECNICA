<script setup>
defineProps({
  message: {
    type: String,
    default: '',
  },
  variant: {
    type: String,
    default: 'default',
  },
})
</script>

<template>
  <p v-if="message" class="feedback" :class="[`feedback--${variant}`]">{{ message }}</p>
</template>
