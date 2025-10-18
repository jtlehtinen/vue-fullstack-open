<script setup>
import { RouterView } from 'vue-router'
import Footer from './components/footer.vue'
import Menu from './components/menu.vue'
import Nofications from './components/notifications.vue'
</script>

<template>
  <main>
    <h1>Software anecdotes</h1>
    <Menu />
    <Nofications />
    <RouterView />
    <Footer />
  </main>
</template>

<style scoped>
main {
  max-width: 720px;
  margin: 0 auto;
}
</style>