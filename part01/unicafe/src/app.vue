<script setup>
import { computed, ref } from 'vue'

const good = ref(0)
const neutral = ref(0)
const bad = ref(0)

const all = computed(() => good.value + neutral.value + bad.value)
const average = computed(() => (good.value - bad.value) / all.value || 0)
const positive = computed(() => (good.value / all.value) * 100 || 0)
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
    <table>
      <tbody>
        <tr><td>Good</td><td>{{ good }}</td></tr>
        <tr><td>Neutral</td><td>{{ neutral }}</td></tr>
        <tr><td>Bad</td><td>{{ bad }}</td></tr>
        <tr><td>All</td><td>{{ all }}</td></tr>
        <tr><td>Average</td><td>{{ average.toFixed(1) }}</td></tr>
        <tr><td>Positive</td><td>{{ positive.toFixed(1) }} %</td></tr>
      </tbody>
    </table>
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