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
  <p class="font-bold">Total of {{ total }} exercises</p>
</template>

<style scoped>
.font-bold {
  font-weight: bold;
}
</style>
