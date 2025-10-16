<script setup>
import CourseContent from './components/course-content.vue'
import CourseHeader from './components/course-header.vue'
import CourseTotal from './components/course-total.vue'

const course = 'Half Stack application development'
const parts = [
  {
    name: 'Fundamentals of React',
    exercises: 10
  },
  {
    name: 'Using props to pass data',
    exercises: 7
  },
  {
    name: 'State of a component',
    exercises: 14
  }
]
</script>

<template>
  <main>
    <CourseHeader :course="course" />
    <CourseContent :parts="parts" />
    <CourseTotal :parts="parts" />
  </main>
</template>

<style scoped>
main {
  max-width: 720px;
  margin: 0 auto;
}
</style>