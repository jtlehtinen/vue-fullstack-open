<script setup>
const search = defineModel({
  type: String,
  required: true,
})
</script>

<template>
  <label>
    Filter shown with:
    <input v-model="search" />
  </label>
</template>