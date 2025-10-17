<script setup>
import Blogs from './components/blogs.vue'
import LoginForm from './components/login-form.vue'
import { isAuthenticated } from './stores/user.js'
</script>

<template>
  <main>
    <Blogs v-if="isAuthenticated" />
    <LoginForm v-else />
  </main>
</template>

<style scoped>
main {
  max-width: 720px;
  margin: 0 auto;
}
</style>
