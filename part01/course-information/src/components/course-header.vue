<script setup lang="ts">
defineProps({
  course: { type: String, required: true }
})
</script>

<template>
  <h2 class="text-heading-32">{{ course }}</h2>
</template>