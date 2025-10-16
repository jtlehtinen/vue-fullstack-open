import { nanoid } from 'nanoid'
import { ref } from 'vue'

export const persons = ref([
  { id: nanoid(), name: 'Juha Lehtinen', number: '040-1234567' },
  { id: nanoid(), name: 'Pekka Mikkola', number: '050-7654321' },
  { id: nanoid(), name: 'Arto Hellas', number: '040-123456' },
  { id: nanoid(), name: 'Ada Lovelace', number: '39-44-5323523' },
  { id: nanoid(), name: 'Dan Abramov', number: '12-43-234345' },
  { id: nanoid(), name: 'Mary Poppendieck', number: '39-23-6423122' }
])
