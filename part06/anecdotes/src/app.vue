<script setup>
import { onBeforeMount } from 'vue'
import AnecdoteForm from './components/anecdote-form.vue'
import AnecdoteList from './components/anecdote-list.vue'
import Notifications from './components/notifications.vue'
import anecdotesService from './services/anecdotes'
import { useAnecdotesStore } from './stores/anecdotes'

onBeforeMount(async () => {
  const store = useAnecdotesStore()
  store.anecdotes = await anecdotesService.getAll()
})
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