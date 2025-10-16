<script setup>
import { computed } from 'vue'

const props = defineProps({
  course: { type: Object, required: true }
})

const total = computed(() => {
  return props.course.parts
    .map(part => part.exercises)
    .reduce((total, exercises) => total + exercises, 0)
})
</script>

<template>
  <p>Number of exercises {{ total }}</p>
</template>
