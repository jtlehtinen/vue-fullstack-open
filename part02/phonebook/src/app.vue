<script setup>
import { nanoid } from 'nanoid'
import { computed, ref } from 'vue'

const name = ref('')
const number = ref('')
const search = ref('')

const persons = ref([
  { id: nanoid(), name: 'Juha Lehtinen', number: '040-1234567' },
  { id: nanoid(), name: 'Pekka Mikkola', number: '050-7654321' },
  { id: nanoid(), name: 'Arto Hellas', number: '040-123456' },
  { id: nanoid(), name: 'Ada Lovelace', number: '39-44-5323523' },
  { id: nanoid(), name: 'Dan Abramov', number: '12-43-234345' },
  { id: nanoid(), name: 'Mary Poppendieck', number: '39-23-6423122' }
])

const personsToShow = computed(() => {
  const searchValue = search.value.trim().toLowerCase()

  if (!searchValue) {
    return persons.value
  }

  return persons.value.filter((person) =>
    person.name.toLowerCase().includes(searchValue),
  )
})

/**
 * @param {string} name
 */
function personExists(name) {
  return persons.value.some(
    (person) => person.name.localeCompare(name, undefined, { sensitivity: 'base' }) === 0,
  )
}

function handleSubmitPersonForm() {
  const nameValue = name.value.trim()
  const numberValue = number.value.trim()

  if (!nameValue) {
    alert('Name cannot be empty')
    return
  }

  if (!numberValue) {
    alert('Number cannot be empty')
    return
  }

  if (personExists(nameValue)) {
    alert(`${nameValue} is already added to phonebook`)
    return
  }

  persons.value = [
    ...persons.value,
    { id: nanoid(), name: nameValue, number: numberValue },
  ]

  name.value = ''
  number.value = ''
}
</script>

<template>
  <main>
    <h1>Phonebook</h1>

    <section>
      <label>
        Filter shown with:
        <input v-model="search" />
      </label>
    </section>


    <section>
      <h2>Add a new</h2>
      <form @submit.prevent="handleSubmitPersonForm">
        <div>
          <label>
            Name:
            <input v-model="name" />
          </label>
        </div>
        <div>
          <label>
            Number:
            <input v-model="number" />
          </label>
        </div>
        <button type="submit">Add</button>
      </form>
    </section>

    <section>
      <h2>Numbers</h2>
      <ul>
        <li v-for="person of personsToShow" :key="person.id">
          {{ person.name }} {{ person.number }}
        </li>
      </ul>
    </section>
  </main>
</template>

<style scoped>
.flex {
  display: flex;
}
.flex-col {
  flex-direction: column;
}

main {
  max-width: 720px;
  margin: 0 auto;
}

ul {
  list-style: none;
  padding: 0;
}
</style>
