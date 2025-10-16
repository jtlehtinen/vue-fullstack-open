<script setup>
import { computed, onBeforeMount, ref } from 'vue'
import weatherService from '~/services/weather'

const props = defineProps({
  capital: { type: String, required: true },
  lat: { type: Number, required: true },
  lon: { type: Number, required: true }
})

const weather = ref()

const iconUrl = computed(() => {
  const weathers = weather.value?.weather
  if (!weathers || weathers.length === 0) return undefined

  const icon = weathers[0]?.icon
  if (!icon) return undefined

  return weatherService.getWeatherIconUrl(icon)
})

const iconAlt = computed(() => {
  const weathers = weather.value?.weather
  return weathers && weathers.length > 0
    ? weathers[0].description ?? 'Weather icon'
    : 'Weather icon'
})

onBeforeMount(async () => {
  weather.value = await weatherService.get(props.lat, props.lon)
})
</script>

<template>
  <section v-if="weather">
    <h3>Weather in {{ capital }}</h3>
    <p>Temperature: {{ weather.main.temp }} °C</p>
    <p>Wind: {{ weather.wind.speed }} m/s</p>

    <img
      v-if="iconUrl"
      :src="iconUrl"
      :alt="iconAlt"
      width="128"
      height="128"
      loading="lazy"
    />
  </section>
</template>