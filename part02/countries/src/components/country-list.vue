<script setup>
defineProps({
  countries: { type: Array, required: true }
})

const emit = defineEmits({
  select: ['country']
})

function handleSelect(country) {
  emit('select', country)
}
</script>

<template>
  <ul>
    <li v-for="country in countries" :key="country.cca3">
      {{ country.name.common }}
      <button @click="handleSelect(country)">Show</button>
    </li>
  </ul>
</template>

<style scoped>
button {
  margin-left: 0.5rem;
}

ul {
  list-style: none;
  padding-left: 0;
}
</style>