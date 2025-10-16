<script setup>
defineProps({
  part: { type: Object, required: true },
})
</script>

<template>
  <li>{{ part.name }} {{ part.exercises }}</li>
</template>
