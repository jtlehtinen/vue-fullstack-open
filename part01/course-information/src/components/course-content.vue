<script setup>
import CourseContentPart from './course-content-part.vue'

defineProps({
  part1: Object,
  part2: Object,
  part3: Object,
})
</script>

<template>
  <ul>
    <CourseContentPart :part="part1" />
    <CourseContentPart :part="part2" />
    <CourseContentPart :part="part3" />
  </ul>
</template>

<style scoped>
ul {
  list-style: none;
  padding: 0;
}
</style>
