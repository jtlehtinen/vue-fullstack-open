<script setup lang="ts">
defineProps({
  course: { type: Object, required: true }
})
</script>

<template>
  <h2>{{ course.name }}</h2>
</template>