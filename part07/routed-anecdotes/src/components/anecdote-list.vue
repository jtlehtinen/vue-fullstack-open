<script setup>
defineProps({
  anecdotes: { type: Array, required: true }
})
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
