<script setup>
defineProps({
  persons: Array
})

const defineEmits = defineEmits({
  'delete-person': ['person'],
})

function handleDelete(person) {
  defineEmits('delete-person', person)
}
</script>

<template>
  <ul>
    <li v-for="person of persons" :key="person.id">
      <span>{{ person.name }} {{ person.number }}</span>
      <button @click="handleDelete(person)">Delete</button>
    </li>
  </ul>
</template>

<style scoped>
ul {
  list-style: none;
  padding: 0;
}

button {
  margin-left: 0.5em;
}
</style>