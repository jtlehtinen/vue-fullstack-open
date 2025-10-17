import axios from 'axios'

const BASE_URL = '/api/blogs'

export async function getAll() {
  const response = await axios.get(BASE_URL)
  return response.data
}

export default { getAll }
