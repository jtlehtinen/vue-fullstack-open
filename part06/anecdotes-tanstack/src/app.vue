<script setup>
import AnecdoteForm from './components/anecdote-form.vue'
import AnecdoteList from './components/anecdote-list.vue'
import Notifications from './components/notifications.vue'
import { useAnecdotes } from '~/composables/anecdotes'

const { error } = useAnecdotes()
</script>

<template>
  <main>
    <h1>Anecdotes</h1>

    <p v-if="error">Anecdote service not available due to problems in server.</p>
    <template v-else>
      <Notifications />
      <AnecdoteForm />
      <AnecdoteList />
    </template>
  </main>
</template>

<style scoped>
main {
  max-width: 720px;
  margin: 0 auto;
}
</style>