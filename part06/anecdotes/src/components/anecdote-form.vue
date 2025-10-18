<script setup>
import { ref } from 'vue'
import anecdotesService from '~/services/anecdotes'
import { useAnecdotesStore } from '~/stores/anecdotes'

const content = ref('')
const anecdotesStore = useAnecdotesStore()

async function handleSubmit() {
  const contentValue = content.value.trim()
  if (!contentValue) {
    window.alert('Anecdote content cannot be empty')
    return
  }

  const createdAnecdote = await anecdotesService.create(contentValue)
  anecdotesStore.add(createdAnecdote)

  content.value = ''
}
</script>

<template>
  <section>
    <h2>Create new</h2>
    <form @submit.prevent="handleSubmit">
      <div>
        <label>
          <input type="text" v-model="content" />
        </label>
        <button type="submit">Create</button>
      </div>
    </form>
  </section>
</template>

<style scoped>
button {
  margin-left: 0.5rem;
}

input {
  min-width: 50%;
}
</style>