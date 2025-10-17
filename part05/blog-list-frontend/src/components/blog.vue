<script setup>
import { ref } from 'vue'

const props = defineProps({
  blog: { type: Object, required: true }
})

const emit = defineEmits(['like'])

const showDetails = ref(false)

function handleToggleDetails() {
  showDetails.value = !showDetails.value
}

async function handleLike() {
  emit('like', props.blog)
}
</script>

<template>
  <div class="blog">
    {{ blog.title }} {{ blog.author }}
    <button @click="handleToggleDetails">
      {{ showDetails ? 'Hide' : 'View' }}
    </button>

    <template v-if="showDetails">
      <div>{{ blog.url }}</div>
      <div>
        Likes: {{ blog.likes }}
        <button @click="handleLike">Like</button>
      </div>
      <div>Added by {{ blog.user.username }}</div>

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