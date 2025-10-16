<script setup>
import CourseContentPart from './course-content-part.vue'

defineProps({
  part1: String,
  part2: String,
  part3: String,
  exercises1: Number,
  exercises2: Number,
  exercises3: Number
})
</script>

<template>
  <ul>
    <CourseContentPart :part="part1" :exercises="exercises1" />
    <CourseContentPart :part="part2" :exercises="exercises2" />
    <CourseContentPart :part="part3" :exercises="exercises3" />
  </ul>
</template>

<style scoped>
ul {
  list-style: none;
  padding: 0;
}
</style>
