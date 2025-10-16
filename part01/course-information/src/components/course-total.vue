<script setup>
import { computed } from 'vue'

const props = defineProps({
  parts: { type: Array, required: true }
})

const total = computed(() => {
  const [part1, part2, part3] = props.parts

  return part1.exercises + part2.exercises + part3.exercises
})
</script>

<template>
  <p>Number of exercises {{ total }}</p>
</template>
