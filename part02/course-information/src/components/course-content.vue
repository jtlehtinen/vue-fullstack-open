<script setup>
import CourseContentPart from './course-content-part.vue'

defineProps({
  course: { type: Object, required: true }
})
</script>

<template>
  <ul>
    <CourseContentPart v-for="part of course.parts" :key="part.id" :part="part" />
  </ul>
</template>

<style scoped>
ul {
  list-style: none;
  padding: 0;
}
</style>
