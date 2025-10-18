<script setup>
import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'
import { useAnecdotesStore } from '~/stores/anecdotes'

const anecdote = ref()

const route = useRoute()
const anecdoteStore = useAnecdotesStore()

onMounted(() => {
  const id = route.params.id
  anecdote.value = anecdoteStore.anecdoteById(id)
})
</script>

<template>
  <div v-if="anecdote">
    <h2>{{ anecdote.content }} by {{ anecdote.author }}</h2>
    <p>Has {{ anecdote.votes }} votes</p>
    <p>For more info see <a :href="anecdote.info">{{ anecdote.info }}</a>.</p>
  </div>
</template>
