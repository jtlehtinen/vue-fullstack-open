<script setup>
import CourseContent from './components/course-content.vue'
import CourseHeader from './components/course-header.vue'
import CourseTotal from './components/course-total.vue'

const course = {
  name: 'Half Stack application development',
  parts: [
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