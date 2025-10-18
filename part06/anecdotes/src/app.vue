<script setup>
import AnecdoteForm from './components/anecdote-form.vue'
import AnecdoteList from './components/anecdote-list.vue'
import Notifications from './components/notifications.vue'
</script>

<template>
  <main>
    <h1>Anecdotes</h1>
    <Notifications />
    <AnecdoteForm />
    <AnecdoteList />
  </main>
</template>

<style scoped>
main {
  max-width: 720px;
  margin: 0 auto;
}
</style>