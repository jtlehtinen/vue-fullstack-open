<script setup>
import { computed } from 'vue'
import Anecdote from './anecdote.vue'
import { useAnecdotes, useVoteAnecdote } from '~/composables/anecdotes'

const { anecdotes } = useAnecdotes()
const voteAnecdote = useVoteAnecdote()

const anecdotesToShow = computed(() => {
  if (!anecdotes.value) {
    return []
  }

  return anecdotes.value.toSorted((a, b) => b.votes - a.votes)
})

async function handleVote(anecdote) {
  await voteAnecdote.mutateAsync(anecdote)
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
      @vote="handleVote(anecdote)"
    />
  </section>
</template>