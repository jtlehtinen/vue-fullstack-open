<script setup>
import CourseContentPart from './course-content-part.vue'

defineProps({
  parts: { type: Array, required: true }
})
</script>

<template>
  <ul>
    <CourseContentPart :part="parts[0]" />
    <CourseContentPart :part="parts[1]" />
    <CourseContentPart :part="parts[2]" />
  </ul>
</template>

<style scoped>
ul {
  list-style: none;
  padding: 0;
}
</style>
