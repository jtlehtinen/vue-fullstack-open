import axios from 'axios'

export async function listPersons() {
  const response = await axios.get('/api/persons')
  return response.data
}

export default {
  list: listPersons
}
