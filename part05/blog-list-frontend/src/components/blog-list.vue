<script setup>
import { onBeforeMount, ref } from 'vue';
import Blog from './blog.vue'
import { logout, username } from '../stores/user.js'
import blogsService from '../services/blogs.js'

const blogs = ref([])

onBeforeMount(async () => {
  blogs.value = await blogsService.getAll()
})
</script>

<template>
  <h2>Blogs</h2>
  <div class="user-info">
    <p><span class="font-bold">{{ username }}</span> logged in.</p>
    <button @click="logout">Logout</button>
  </div>
  <Blog v-for="blog in blogs" :key="blog.id" :blog="blog" />
</template>

<style scoped>
.font-bold {
  font-weight: bold;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
</style>
