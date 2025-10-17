import axios from 'axios'

const BASE_URL = '/api/blogs'

export async function create(blog, token) {
  const response = await axios.post(BASE_URL, blog, {
    headers: { Authorization: `Bearer ${token}` },
  })

  return response.data
}

export async function getAll() {
  const response = await axios.get(BASE_URL)
  return response.data
}

export default {
  create,
  getAll,
}
