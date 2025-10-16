<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  part1: Object,
  part2: Object,
  part3: Object,
})

const total = computed(() => {
  return props.part1.exercises + props.part2.exercises + props.part3.exercises
})
</script>

<template>
  <p>Number of exercises {{ total }}</p>
</template>