<script setup>
import { onBeforeMount, ref } from 'vue';
import Blog from '~/components/blog.vue'
import BlogForm from '~/components/blog-form.vue'
import Notification from '~/components/notification.vue'
import Toggleable from '~/components/toggleable.vue'
import { useNotification } from '~/composables/use-notification'
import blogsService from '~/services/blogs'
import { blogs } from '~/stores/blogs'
import { getToken, logout, username } from '~/stores/user'

const title = ref('')
const author = ref('')
const url = ref('')
const isCreateFormOpen = ref(false)

const { notification, success: showSuccess, error: showError } = useNotification()

function resetCreateForm() {
  title.value = ''
  author.value = ''
  url.value = ''
  isCreateFormOpen.value = false
}

async function handleSubmitBlogForm(titleValue, authorValue, urlValue) {
  try {
    const newBlog = {
      title: titleValue,
      author: authorValue,
      url: urlValue,
    }

    const createdBlog = await blogsService.create(newBlog ,getToken())
    blogs.value = blogs.value.concat(createdBlog)

    resetCreateForm()

    showSuccess(`A new blog "${createdBlog.title}" by ${createdBlog.author} added`)
  } catch (error) {
    const message = error.response?.data.error || 'unknown error occurred'
    showError(message)
  }
}

onBeforeMount(async () => {
  blogs.value = await blogsService.getAll()
})
</script>

<template>
  <h2>Blogs</h2>

  <Notification
    v-if="notification"
    class="notification"
    :message="notification.message"
    :type="notification.type"
  />

  <div class="user-info">
    <p><span class="font-bold">{{ username }}</span> logged in.</p>
    <button @click="logout">Logout</button>
  </div>

  <Toggleable
    v-model="isCreateFormOpen"
    open-label="Create new blog"
    close-label="Cancel"
  >
    <h3>Create new</h3>
    <BlogForm
      :title="title"
      :author="author"
      :url="url"
      @update:title="title = $event"
      @update:author="author = $event"
      @update:url="url = $event"
      @submit="handleSubmitBlogForm"
    />
  </Toggleable>

  <h3>List</h3>
  <Blog v-for="blog in blogs" :key="blog.id" :blog="blog" />
</template>

<style scoped>
.font-bold {
  font-weight: bold;
}

.notification {
  margin-bottom: 1rem;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
</style>