<script setup>
import { nanoid } from 'nanoid'
import { ref } from 'vue'

const name = ref('')

const persons = ref([
  { id: nanoid(), name: 'Juha Lehtinen' },
])

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

  if (!nameValue) {
    alert('Name cannot be empty')
    return
  }

  if (personExists(nameValue)) {
    alert(`${nameValue} is already added to phonebook`)
    return
  }

  persons.value = [
    ...persons.value,
    { id: nanoid(), name: nameValue },
  ]

  name.value = ''
}
</script>

<template>
  <main>
    <h1>Phonebook</h1>

    <form @submit.prevent="handleSubmitPersonForm">
      <div>
        <label>
          Name:
          <input
            id="name-input"
            v-model="name"
          />
        </label>
        <button type="submit">Add</button>
      </div>
    </form>

    <section>
      <h2>Numbers</h2>
      <ul>
        <li v-for="person of persons" :key="person.id">
          {{ person.name }}
        </li>
      </ul>
    </section>
  </main>
</template>

<style scoped>
main {
  max-width: 720px;
  margin: 0 auto;
}

ul {
  list-style: none;
  padding: 0;
}

button {
  margin-left: 0.5rem;
}
</style>
