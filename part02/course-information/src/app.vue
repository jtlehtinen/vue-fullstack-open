<script setup>
import CourseContent from './components/course-content.vue'
import CourseHeader from './components/course-header.vue'
import CourseTotal from './components/course-total.vue'

const course = {
  id: 1,
  name: 'Half Stack application development',
  parts: [
    {
      name: 'Fundamentals of React',
      exercises: 10,
      id: 1
    },
    {
      name: 'Using props to pass data',
      exercises: 7,
      id: 2
    },
    {
      name: 'State of a component',
      exercises: 14,
      id: 3
    }
  ]
}
</script>

<template>
  <main>
    <CourseHeader :course="course" />
    <CourseContent :course="course" />
    <CourseTotal :course="course" />
  </main>
</template>

<style scoped>
main {
  max-width: 720px;
  margin: 0 auto;
}
</style>