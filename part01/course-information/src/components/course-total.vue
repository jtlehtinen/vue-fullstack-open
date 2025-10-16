<script setup lang="ts">
defineProps({
  exercises1: Number,
  exercises2: Number,
  exercises3: Number
})
</script>

<template>
  <p>Number of exercises {{ exercises1 + exercises2 + exercises3 }}</p>
</template>