<script setup>
import { storeToRefs } from 'pinia'
import { RouterLink } from 'vue-router'
import { useAnecdotesStore } from '~/stores/anecdotes'

const anecdotesStore = useAnecdotesStore()
const { anecdotes } = storeToRefs(anecdotesStore)
</script>

<template>
  <div>
    <h2>Anecdotes</h2>
    <ul>
      <li v-for="anecdote in anecdotes" :key="anecdote.id">
        <RouterLink :to="`/anecdotes/${anecdote.id}`">
          {{ anecdote.content }}
        </RouterLink>
      </li>
    </ul>
  </div>
</template>
