<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <div>
    <RouterLink to="/">anecdotes</RouterLink>
    <RouterLink to="/create">create new</RouterLink>
    <RouterLink to="/about">about</RouterLink>
  </div>
</template>

<style scoped>
a {
  padding-right: 5px;
}
</style>
