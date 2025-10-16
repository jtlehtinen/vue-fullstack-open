import axios from 'axios'

const BASE_URL = 'https://studies.cs.helsinki.fi/restcountries/api'

export async function listCountries() {
  const response = await axios.get(`${BASE_URL}/all`)
  return response.data
}

export default {
  list: listCountries,
}
