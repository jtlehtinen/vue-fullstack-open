<script setup>
import { computed, onBeforeMount, ref } from 'vue'
import Notification from './components/notification.vue'
import PersonFilter from './components/person-filter.vue'
import PersonForm from './components/person-form.vue'
import PersonList from './components/person-list.vue'
import { useNotification } from './composables/use-notification'
import personService from './services/person'

const name = ref('')
const number = ref('')
const search = ref('')
const persons = ref([])

const { notification, success: showSuccess, error: showError } = useNotification()

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

async function handleSubmitPersonForm(person) {
  const nameValue = person.name.trim()
  const numberValue = person.number.trim()

  if (!nameValue) {
    window.alert('Name cannot be empty')
    return
  }

  if (!numberValue) {
    window.alert('Number cannot be empty')
    return
  }

  if (personExists(nameValue)) {
    if (!window.confirm(`${person.name} is already added to the phonebook, replace the old number with a new one?`)) {
      return
    }

    await handleUpdatePerson({
      ...persons.value.find((p) => p.name === nameValue),
      number: numberValue,
    })
  } else {
    await handleCreatePerson(person)
  }


  name.value = ''
  number.value = ''
}

async function handleCreatePerson(person) {
  try {
    const createdPerson = await personService.create(person)
    persons.value = [...persons.value, createdPerson]
    showSuccess(`Added ${createdPerson.name}`)
  } catch (error) {
    const message = error.response?.data?.error || 'An unexpected error occurred'
    showError(message)
  }
}

async function handleUpdatePerson(person) {
  const updatedPerson = await personService.update(person)
  persons.value = persons.value.map((p) => (p.id === updatedPerson.id ? updatedPerson : p))
}

async function handleDeletePerson(person) {
  if (!window.confirm(`Delete ${person.name}?`)) {
    return
  }


  try {
    await personService.delete(person.id)
    persons.value = persons.value.filter((p) => p.id !== person.id)
  } catch (error) {
    if (error.status === 404) {
      showError(`Information of ${person.name} has already been removed from the server`)
      persons.value = persons.value.filter((p) => p.id !== person.id)
    }
  }
}

onBeforeMount(async () => {
  persons.value = await personService.list()
})
</script>

<template>
  <main>
    <h1>Phonebook</h1>

    <Notification v-if="notification" class="notification" :message="notification.message" :type="notification.type" />

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

.notification {
  margin-bottom: 1rem;
}
</style>
