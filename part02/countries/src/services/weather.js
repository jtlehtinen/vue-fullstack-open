import axios from 'axios'

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather'

/**
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 */
export async function getWeather(lat, lon) {
  const response = await axios.get(BASE_URL, {
    params: {
      lat,
      lon,
      appid: API_KEY,
      units: 'metric',
    },
  })

  return response.data
}

/**
 * @param {string} iconCode
 */
export function getWeatherIconUrl(iconCode) {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`
}

export default {
  get: getWeather,
  getWeatherIconUrl,
}
