<script setup>
import { ref } from 'vue'

const good = ref(0)
const neutral = ref(0)
const bad = ref(0)
</script>

<template>
  <main>
    <h2>Give feedback</h2>
    <button @click="bad++">
      Bad
    </button>
    <button @click="neutral++">
      Neutral
    </button>
    <button @click="good++">
      Good
    </button>

    <h2>Statistics</h2>
    <ul>
      <li>Good {{ good }}</li>
      <li>Neutral {{ neutral }}</li>
      <li>Bad {{ bad }}</li>
    </ul>
  </main>
</template>

<style scoped>
main {
  max-width: 720px;
  margin: 0 auto;
}

button {
  margin-right: 0.5rem;
}

ul {
  list-style: none;
  padding-left: 0;
}
</style>