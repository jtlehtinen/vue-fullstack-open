<script setup>
import { storeToRefs } from 'pinia'
import { useAnecdotesStore } from '~/stores/anecdotes'

const anecdotesStore = useAnecdotesStore()
const { anecdotes } = storeToRefs(anecdotesStore)
</script>

<template>
  <div>
    <h2>Anecdotes</h2>
    <ul>
      <li v-for="anecdote in anecdotes" :key="anecdote.id">
        {{ anecdote.content }}
      </li>
    </ul>
  </div>
</template>
