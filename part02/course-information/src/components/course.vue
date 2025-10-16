<script setup>
import CourseContent from './course-content.vue'
import CourseHeader from './course-header.vue'
import CourseTotal from './course-total.vue'

defineProps({
  course: { type: Object, required: true }
})
</script>

<template>
  <section>
    <CourseHeader :course="course" />
    <CourseContent :course="course" />
    <CourseTotal :course="course" />
  </section>
</template>
