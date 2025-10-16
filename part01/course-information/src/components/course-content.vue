<script setup>
import CourseContentPart from './course-content-part.vue'

defineProps({
  course: { type: Object, required: true }
})
</script>

<template>
  <ul>
    <CourseContentPart :part="course.parts[0]" />
    <CourseContentPart :part="course.parts[1]" />
    <CourseContentPart :part="course.parts[2]" />
  </ul>
</template>

<style scoped>
ul {
  list-style: none;
  padding: 0;
}
</style>
