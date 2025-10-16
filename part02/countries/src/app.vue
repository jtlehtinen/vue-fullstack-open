<script setup>
import { computed, onBeforeMount, ref } from 'vue'
import CountryDetails from './components/country-details.vue'
import CountryFilter from './components/country-filter.vue'
import CountryList from './components/country-list.vue'
import CountryTooMany from './components/country-too-many.vue'
import countryService from './services/country'

const countries = ref([])
const filter = ref('')

const countriesToShow = computed(() => {
  const filterValue = filter.value.trim().toLowerCase()
  if (!filterValue) {
    return countries.value
  }

  return countries.value.filter(c =>
    c.name.common.toLowerCase().includes(filterValue)
  )
})

onBeforeMount(async () => {
  countries.value = await countryService.list()
})
</script>

<template>
  <main>
    <h1>Countries</h1>

    <CountryFilter v-model="filter" />

    <CountryTooMany v-if="countriesToShow.length > 10" />
    <CountryList v-else-if="countriesToShow.length > 1" :countries="countriesToShow" />
    <CountryDetails
      v-else-if="countriesToShow.length === 1"
      :country="countriesToShow[0]"
    />

  </main>
</template>

<style scoped>
main {
  max-width: 720px;
  margin: 0 auto;
}
</style>