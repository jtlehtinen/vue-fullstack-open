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

export async function deletePerson(id) {
  return await axios.delete(`${BASE_URL}/${id}`)
}

export async function updatePerson(person) {
  const response = await axios.put(`${BASE_URL}/${person.id}`, person)
  return response.data
}

export default {
  create: createPerson,
  delete: deletePerson,
  list: listPersons,
  update: updatePerson,
}
