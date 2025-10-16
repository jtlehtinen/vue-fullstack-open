<script setup lang="ts">
import { computed } from 'vue'
import StatisticsTableLine from './statistics-table-line.vue'

const props = defineProps({
  good: Number,
  neutral: Number,
  bad: Number
})

const all = computed(() => props.good + props.neutral + props.bad)
const average = computed(() => (props.good - props.bad) / all.value || 0)
const positive = computed(() => (props.good / all.value) * 100 || 0)

const isFeedbackGiven = computed(() => all.value > 0)
</script>

<template>
  <table v-if="isFeedbackGiven">
    <tbody>
      <StatisticsTableLine name="Good" :value="good" />
      <StatisticsTableLine name="Neutral" :value="neutral" />
      <StatisticsTableLine name="Bad" :value="bad" />
      <StatisticsTableLine name="All" :value="all" />
      <StatisticsTableLine name="Average" :value="average.toFixed(1)" />
      <StatisticsTableLine name="Positive" :value="positive.toFixed(1) + ' %'" />
    </tbody>
  </table>

  <p v-else>No feedback given</p>
</template>
