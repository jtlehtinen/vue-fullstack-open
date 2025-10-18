<script setup>
defineProps({
  type: { type: String, required: true },
  message: { type: String, required: false },
})
</script>

<template>
  <div>{{ message }}</div>
</template>

<style scoped>
div {
  border: solid;
  padding: 0.75rem;
  border-width: 1px;
  margin-bottom: 0.75rem;
}
</style>
