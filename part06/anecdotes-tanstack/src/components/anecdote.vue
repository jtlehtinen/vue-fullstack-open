<script setup lang="ts">
defineProps({
  content: { type: String, required: true },
  votes: { type: Number, required: true }
})

const emit = defineEmits(['vote'])

function handleVote() {
  emit('vote')
}
</script>

<template>
  <div>
    <p>{{ content }}</p>
    <p>Has {{ votes }} votes</p>
    <button @click="handleVote">Vote</button>
  </div>
</template>

<style scoped>
p {
  margin: 0;
}

div {
  margin-bottom: 1rem;
}
</style>
