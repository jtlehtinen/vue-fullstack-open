<script setup>
import { nanoid } from 'nanoid'
import { computed, onBeforeMount, ref } from 'vue'
import PersonFilter from './components/person-filter.vue'
import PersonForm from './components/person-form.vue'
import PersonList from './components/person-list.vue'
import personService from './services/person'

const name = ref('')
const number = ref('')
const search = ref('')
const persons = ref([])

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

async function handleSubmitPersonForm() {
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

  const createdPerson = await personService.create({
    name: nameValue,
    number: numberValue,
  })

  persons.value = [...persons.value, createdPerson]

  name.value = ''
  number.value = ''
}

async function handleDeletePerson(person) {
  if (!confirm(`Delete ${person.name}?`)) {
    return
  }

  await personService.delete(person.id)

  persons.value = persons.value.filter((p) => p.id !== person.id)
}

onBeforeMount(async () => {
  persons.value = await personService.list()
})
</script>

<template>
  <main>
    <h1>Phonebook</h1>

    <section>
      <PersonFilter v-model="search" />
    </section>

    <section>
      <h2>Add a new</h2>
      <PersonForm
        :name="name"
        :number="number"
        @update:name="name = $event"
        @update:number="number = $event"
        @submit="handleSubmitPersonForm"
      />
    </section>

    <section>
      <h2>Numbers</h2>
      <PersonList
        :persons="personsToShow"
        @delete-person="handleDeletePerson"
      />
    </section>
  </main>
</template>

<style scoped>
main {
  max-width: 720px;
  margin: 0 auto;
}
</style>
