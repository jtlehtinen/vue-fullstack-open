<script setup>
import { computed, ref } from 'vue'
import { anecdotes } from './anecdotes'
import Anecdote from './components/anecdote.vue'
import { getRandomInt } from './lib/random'

const selected = ref(0)
const votes = ref(new Array(anecdotes.length).fill(0))

const mostVoted = computed(() => {
  let idx = 0

  for (let i = 1; i < votes.value.length; ++i) {
    if (votes.value[i] > votes.value[idx]) {
      idx = i
    }
  }

  return idx
})

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
    <h1>Anecdotes</h1>

    <section>
      <h2>Anecdote of the day</h2>
      <Anecdote :text="anecdotes[selected]" :votes="votes[selected]" />
      <button @click="voteAnecdote(selected)">Vote</button>
      <button @click="nextAnecdote">Next</button>
    </section>

    <section>
      <h2>Most voted anecdote</h2>
      <Anecdote :text="anecdotes[mostVoted]" :votes="votes[mostVoted]" />
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