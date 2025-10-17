<script setup>
import { ref } from 'vue'

const props = defineProps({
  blog: { type: Object, required: true }
})

const emit = defineEmits(['like', 'remove'])

const showDetails = ref(false)

function handleToggleDetails() {
  showDetails.value = !showDetails.value
}

function handleLike() {
  emit('like', props.blog)
}

function handleRemove() {
  emit('remove', props.blog)
}
</script>

<template>
  <div class="blog">
    <span data-testid="blog-title-author">{{ blog.title }} {{ blog.author }}</span>
    <button data-testid="blog-view-btn" @click="handleToggleDetails">
      {{ showDetails ? 'Hide' : 'View' }}
    </button>

    <template v-if="showDetails">
      <div data-testid="blog-url">{{ blog.url }}</div>
      <div data-testid="blog-likes">
        Likes: {{ blog.likes }}
        <button data-testid="blog-like-btn" @click="handleLike">Like</button>
      </div>
      <div data-testid="blog-user">Added by {{ blog.user.username }}</div>
      <button @click="handleRemove">Remove</button>
    </template>
  </div>
</template>

<style scoped>
.blog {
  border: 1px solid black;
  padding: 0.25rem 0.5rem;
  margin-bottom: 0.5rem;
}

ul {
  list-style: none;
  padding: 0;
}
</style>