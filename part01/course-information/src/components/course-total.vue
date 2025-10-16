<script setup>
import { computed } from 'vue'

const props = defineProps({
  course: { type: Object, required: true }
})

const total = computed(() => {
  const [part1, part2, part3] = props.course.parts

  return part1.exercises + part2.exercises + part3.exercises
})
</script>

<template>
  <p>Number of exercises {{ total }}</p>
</template>
