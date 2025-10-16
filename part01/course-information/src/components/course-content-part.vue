<script setup>
defineProps({
  part: Object,
})
</script>

<template>
  <li>{{ part.name }} {{ part.exercises }}</li>
</template>
