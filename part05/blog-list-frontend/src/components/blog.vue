<script setup>
defineProps({
  blog: { type: Object, required: true }
})
</script>

<template>
  <div>{{ blog.title }} {{ blog.author }}</div>
</template>