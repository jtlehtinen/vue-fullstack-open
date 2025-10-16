<script setup lang="ts">
defineProps({
  text: String,
  votes: Number
})
</script>

<template>
  <p>{{ text }}</p>
  <p>Has {{ votes }} votes</p>
</template>
