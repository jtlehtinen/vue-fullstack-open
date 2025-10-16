<script setup lang="ts">
import { computed } from 'vue'

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
      <tr><td class="w-1/2">Good</td><td class="w-1/2">{{ good }}</td></tr>
      <tr><td>Neutral</td><td>{{ neutral }}</td></tr>
      <tr><td>Bad</td><td>{{ bad }}</td></tr>
      <tr><td>All</td><td>{{ all }}</td></tr>
      <tr><td>Average</td><td>{{ average.toFixed(1) }}</td></tr>
      <tr><td>Positive</td><td>{{ positive.toFixed(1) }} %</td></tr>
    </tbody>
  </table>

  <p v-else>No feedback given</p>
</template>
