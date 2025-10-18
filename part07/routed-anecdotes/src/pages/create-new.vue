<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAnecdotesStore } from '~/stores/anecdotes'

const router = useRouter()

const content = ref('')
const author = ref('')
const info = ref('')

function resetForm() {
  content.value = ''
  author.value = ''
  info.value = ''
}

function handleSubmit() {
  useAnecdotesStore().create({
    content: content.value,
    author: author.value,
    info: info.value,
    votes: 0
  })
  resetForm()
  router.push('/')
}
</script>

<template>
  <div>
    <h2>create a new anecdote</h2>
    <form @submit.prevent="handleSubmit">
      <div>
        content
        <input
          name="content"
          v-model="content"
        />
      </div>
      <div>
        author
        <input
          name="author"
          v-model="author"
        />
      </div>
      <div>
        url for more info
        <input
          name="info"
          v-model="info"
        />
      </div>
      <button>create</button>
    </form>
  </div>
</template>
