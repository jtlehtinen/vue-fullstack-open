<script setup>
import WeatherDetails from './weather-details.vue'

defineProps({
  country: { type: Object, required: true }
})
</script>

<template>
  <section>
    <h2>{{ country.name.common }}</h2>

    <div>
      <p>Capital: {{ country.capital[0] }}</p>
      <p>Area: {{ country.area }} km<sup>2</sup></p>
    </div>

    <div>
      <h3>Languages</h3>
      <ul>
        <li v-for="(language, code) in country.languages" :key="code">
          {{ language }}
        </li>
      </ul>
    </div>

    <img
      :src="country.flags.png"
      :alt="country.flags.alt"
      width="256"
    />

    <WeatherDetails
      v-if="country.capitalInfo?.latlng"
      :capital="country.capital?.[0] ?? ''"
      :lat="country.capitalInfo.latlng[0]"
      :lon="country.capitalInfo.latlng[1]"
    />
  </section>
</template>

<style scoped>
img {
  border: 1px solid #ccc;
  border-radius: 0.25rem;
}

ul {
  list-style: none;
  padding-left: 0;
}
</style>