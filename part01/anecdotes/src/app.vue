<script setup>
import { ref } from 'vue'
import { anecdotes } from './anecdotes'
import { getRandomInt } from './lib/random'

const selected = ref(0)

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
</script>

<template>
  <main>
    <section>
      <p>{{ anecdotes[selected] }}</p>
      <button @click="nextAnecdote">Next anecdote</button>
    </section>
  </main>
</template>

<style scoped>
main {
  max-width: 720px;
  margin: 0 auto;
}
</style>