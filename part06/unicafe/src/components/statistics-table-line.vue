<script setup>
defineProps({
  name: String,
  value: [String, Number]
})
</script>

<template>
  <tr>
    <td>{{ name }}</td>
    <td>{{ value }}</td>
  </tr>
</template>
