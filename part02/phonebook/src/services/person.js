import axios from 'axios'

const BASE_URL = '/api/persons'

export async function createPerson(person) {
  const response = await axios.post(BASE_URL, person)
  return response.data
}

export async function listPersons() {
  const response = await axios.get(BASE_URL)
  return response.data
}

export default {
  create: createPerson,
  list: listPersons
}
