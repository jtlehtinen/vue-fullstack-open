<script setup>
const props = defineProps({
  name: String,
  number: String
})

const emit = defineEmits({
  'update:name': ['name'],
  'update:number': ['number'],
  submit: ['person'],
})

/**
 * @param {Event} event
 */
function updateName(event) {
  emit('update:name', event.target.value)
}

/**
 * @param {Event} event
 */
function updateNumber(event) {
  emit('update:number', event.target.value)
}

function handleSubmit() {
  emit('submit', { name: props.name, number: props.number })
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div>
      <label>
        Name:
        <input :value="name" @input="updateName" />
      </label>
    </div>
    <div>
      <label>
        Number:
        <input :value="number" @input="updateNumber" />
      </label>
    </div>
    <button type="submit">Add</button>
  </form>
</template>
