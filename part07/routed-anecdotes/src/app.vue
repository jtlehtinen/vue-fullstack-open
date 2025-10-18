<script setup>
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import Footer from './components/footer.vue'
import Menu from './components/menu.vue'

const notification = ref('')
</script>

<template>
  <main>
    <h1>Software anecdotes</h1>
    <Menu />
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