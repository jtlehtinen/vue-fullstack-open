<script setup>
defineProps({
  part: String,
  exercises: Number
})
</script>

<template>
  <li>{{ part }} {{ exercises }}</li>
</template>
