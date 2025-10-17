<script setup>
import BlogPage from './pages/blogs-page.vue'
import LoginPage from './pages/login-page.vue'
import { isAuthenticated } from './stores/user'
</script>

<template>
  <main>
    <BlogPage v-if="isAuthenticated" />
    <LoginPage v-else />
  </main>
</template>

<style scoped>
main {
  max-width: 720px;
  margin: 0 auto;
}
</style>
