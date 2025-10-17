<script setup>
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import Anecdote from './anecdote.vue'
import { useAnecdotesStore } from '~/stores/anecdotes'

const anecdotesStore = useAnecdotesStore()
const { anecdotes } = storeToRefs(anecdotesStore)

const anecdotesToShow = computed(() => {
  return anecdotes.value.toSorted((a, b) => b.votes - a.votes)
})

function handleVote(id) {
  anecdotesStore.vote(id)
}
</script>

<template>
  <section>
    <h2>Anecdote list</h2>
    <Anecdote
      v-for="anecdote in anecdotesToShow"
      :key="anecdote.id"
      :content="anecdote.content"
      :votes="anecdote.votes"
      @vote="handleVote(anecdote.id)"
    />
  </section>
</template>