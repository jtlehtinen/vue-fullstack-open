<script setup>
import { ref } from 'vue'

const title = ref('')
const author = ref('')
const url = ref('')

const emit = defineEmits([
  'submit'
])

function resetForm() {
  title.value = ''
  author.value = ''
  url.value = ''
}

async function handleSubmit() {
  const titleValue = title.value.trim()
  const authorValue = author.value.trim()
  const urlValue = url.value.trim()

  emit('submit', titleValue, authorValue, urlValue)
  resetForm()
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div>
      <label>Title:
        <input type="text" v-model="title" />
      </label>
    </div>
    <div>
      <label>Author:
        <input type="text" v-model="author" />
      </label>
    </div>
    <div>
      <label>URL:
        <input type="url" v-model="url" />
      </label>
    </div>
    <button type="submit">Create</button>
  </form>
</template>
