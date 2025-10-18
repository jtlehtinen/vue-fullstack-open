<script setup>
import { ref } from 'vue'
import { useCreateAnecdote } from '~/composables/anecdotes'

const content = ref('')
const create = useCreateAnecdote()

async function handleSubmit() {
  const contentValue = content.value.trim()
  if (!contentValue) {
    window.alert('Anecdote content cannot be empty')
    return
  }

  try {
    await create.mutateAsync(contentValue)
    content.value = ''
  } catch { /* ignore */ }
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