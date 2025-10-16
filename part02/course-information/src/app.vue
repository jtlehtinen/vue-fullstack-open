<script setup>
import Course from './components/course.vue'
import { courses } from './data.js'
</script>

<template>
  <main>
    <h1>Web development curriculum</h1>
    <Course v-for="course of courses" :key="course.id" :course="course" />
  </main>
</template>

<style scoped>
main {
  max-width: 720px;
  margin: 0 auto;
}
</style>