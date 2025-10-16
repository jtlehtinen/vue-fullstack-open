<script setup>
import CourseContent from './components/course-content.vue'
import CourseHeader from './components/course-header.vue'
import CourseTotal from './components/course-total.vue'

const course = 'Half Stack application development'
const part1 = {
  name: 'Fundamentals of React',
  exercises: 10
}
const part2 = {
  name: 'Using props to pass data',
  exercises: 7
}
const part3 = {
  name: 'State of a component',
  exercises: 14
}
</script>

<template>
  <main>
    <CourseHeader :course="course" />
    <CourseContent
      :part1="part1"
      :part2="part2"
      :part3="part3"
    />
    <CourseTotal
      :part1="part1"
      :part2="part2"
      :part3="part3"
    />
  </main>
</template>

<style scoped>
main {
  max-width: 720px;
  margin: 0 auto;
}
</style>