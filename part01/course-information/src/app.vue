<script setup>
import CourseContent from './components/course-content.vue'
import CourseHeader from './components/course-header.vue'
import CourseTotal from './components/course-total.vue'

const course = 'Half Stack application development'
const part1 = 'Fundamentals of React'
const exercises1 = 10
const part2 = 'Using props to pass data'
const exercises2 = 7
const part3 = 'State of a component'
const exercises3 = 14
</script>

<template>
  <main>
    <CourseHeader :course="course" />
    <CourseContent
      :part1="part1"
      :part2="part2"
      :part3="part3"
      :exercises1="exercises1"
      :exercises2="exercises2"
      :exercises3="exercises3"
    />
    <CourseTotal
      :exercises1="exercises1"
      :exercises2="exercises2"
      :exercises3="exercises3"
    />
  </main>
</template>

<style scoped>
main {
  max-width: 720px;
  margin: 0 auto;
}
</style>