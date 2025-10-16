<script setup>
defineProps({
  countries: Array
})
</script>

<template>
  <ul>
    <li v-for="country in countries" :key="country.cca3">
      {{ country.name.common }}
    </li>
  </ul>
</template>

<style scoped>
ul {
  list-style: none;
  padding-left: 0;
}
</style>