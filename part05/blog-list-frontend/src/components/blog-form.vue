<script setup>
import { ref } from 'vue'
import blogsService from '../services/blogs.js'
import { getToken } from '../stores/user.js'
import { blogs } from '../stores/blogs.js'

const title = ref('')
const author = ref('')
const url = ref('')

function resetForm() {
  title.value = ''
  author.value = ''
  url.value = ''
}

async function handleSubmit() {
  const titleValue = title.value.trim()
  const authorValue = author.value.trim()
  const urlValue = url.value.trim()

  try {
    const newBlog = {
      title: titleValue,
      author: authorValue,
      url: urlValue,
    }

    const createdBlog = await blogsService.create(newBlog ,getToken())
    blogs.value = blogs.value.concat(createdBlog)

    resetForm()
  } catch (error) {
    console.error('Error creating blog', error)
  }
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
