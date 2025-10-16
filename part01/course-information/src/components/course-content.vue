<script setup>
defineProps({
  part1: String,
  part2: String,
  part3: String,
  exercises1: Number,
  exercises2: Number,
  exercises3: Number
})
</script>

<template>
  <p>{{ part1 }} {{ exercises1 }}</p>
  <p>{{ part2 }} {{ exercises2 }}</p>
  <p>{{ part3 }} {{ exercises3 }}</p>
</template>
