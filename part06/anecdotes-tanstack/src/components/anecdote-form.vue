<script setup>
import { ref } from 'vue'

const content = ref('')

async function handleSubmit() {
  const contentValue = content.value.trim()
  if (!contentValue) {
    window.alert('Anecdote content cannot be empty')
    return
  }

  // @TODO: ...

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