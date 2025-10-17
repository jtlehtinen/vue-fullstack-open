import axios from 'axios'

const BASE_URL = '/api/login'

export async function login(username, password) {
  const response = await axios.post(BASE_URL, { username, password })
  return response.data
}

export default { login }
