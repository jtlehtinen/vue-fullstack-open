<script setup>
import { ref } from 'vue'
import { anecdotes } from './anecdotes'
import { getRandomInt } from './lib/random'

const selected = ref(0)
const votes = ref(new Array(anecdotes.length).fill(0))

function nextAnecdote() {
  if (anecdotes.length <= 1) {
    return
  }

  let next = selected.value
  while (next === selected.value) {
    next = getRandomInt(anecdotes.length)
  }
  selected.value = next
}

function voteAnecdote(index) {
  if (index < 0 || index >= anecdotes.length) {
    throw new Error('Index out of bounds')
  }

  const newVotes = [...votes.value]
  newVotes[index] += 1

  votes.value = newVotes
}
</script>

<template>
  <main>
    <section>
      <p>{{ anecdotes[selected] }}</p>
      <p>Has {{ votes[selected] }} votes</p>
      <button @click="voteAnecdote(selected)">Vote</button>
      <button @click="nextAnecdote">Next</button>
    </section>
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