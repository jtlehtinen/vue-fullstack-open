<script setup>
import { ref } from 'vue'
import Button from './components/button.vue'
import StatisticsTable from './components/statistics-table.vue'

const good = ref(0)
const neutral = ref(0)
const bad = ref(0)
</script>

<template>
  <main>
    <h2>Give feedback</h2>
    <Button @click="bad++">
      Bad
    </Button>
    <Button @click="neutral++">
      Neutral
    </Button>
    <Button @click="good++">
      Good
    </Button>

    <h2>Statistics</h2>
    <StatisticsTable
      :good="good"
      :neutral="neutral"
      :bad="bad"
    />
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
</style>