<script setup>
import { ref } from 'vue'
import About from './components/about.vue'
import AnecdoteList from './components/anecdote-list.vue'
import CreateNew from './components/create-new.vue'
import Footer from './components/footer.vue'
import Menu from './components/menu.vue'

const anecdotes = ref([
  {
    content: 'If it hurts, do it more often',
    author: 'Jez Humble',
    info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
    votes: 0,
    id: 1
  },
  {
    content: 'Premature optimization is the root of all evil',
    author: 'Donald Knuth',
    info: 'http://wiki.c2.com/?PrematureOptimization',
    votes: 0,
    id: 2
  }
])

const notification = ref('')

function addNew(anecdote) {
  anecdote.id = Math.round(Math.random() * 10000)
  anecdotes.value = [...anecdotes.value, anecdote]
}

function anecdoteById(id) {
  return anecdotes.value.find(a => a.id === id)
}

function vote(id) {
  const anecdote = anecdoteById(id)

  const voted = {
    ...anecdote,
    votes: anecdote.votes + 1
  }

  anecdotes.value = anecdotes.value.map(a => a.id === id ? voted : a)
}
</script>

<template>
  <main>
    <h1>Software anecdotes</h1>
    <Menu />
    <AnecdoteList :anecdotes="anecdotes" />
    <About />
    <CreateNew @submit="addNew" />
    <Footer />
  </main>
</template>

<style scoped>
main {
  max-width: 720px;
  margin: 0 auto;
}
</style>