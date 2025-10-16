<script setup>
defineProps({
  persons: Array
})
</script>

<template>
  <ul>
    <li v-for="person of persons" :key="person.id">
      {{ person.name }} {{ person.number }}
    </li>
  </ul>
</template>

<style scoped>
ul {
  list-style: none;
  padding: 0;
}
</style>