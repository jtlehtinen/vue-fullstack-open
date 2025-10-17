<script setup>
import { storeToRefs } from 'pinia'
import Anecdote from './components/anecdote.vue'
import { useAnecdotesStore } from './stores/anecdotes'

const anecdotesStore = useAnecdotesStore()
const { anecdotes } = storeToRefs(anecdotesStore)

function handleVote(id) {
  anecdotesStore.vote(id)
}
</script>

<template>
  <main>
    <h1>Anecdotes</h1>
    <Anecdote
      v-for="anecdote in anecdotes"
      :key="anecdote.id"
      :content="anecdote.content"
      :votes="anecdote.votes"
      @vote="handleVote(anecdote.id)"
    />
  </main>
</template>

<style scoped>
main {
  max-width: 720px;
  margin: 0 auto;
}

button {
  margin-right: 0.5rem;
}
</style>