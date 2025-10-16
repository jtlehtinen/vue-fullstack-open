<script setup>
const modelValue = defineModel({ type: String, required: true })

/**
 * @param {InputEvent} event
 */
function handleInput(event) {
  modelValue.value = event.target.value
}
</script>

<template>
  <label>
    Find countries:
    <input
      :value="modelValue"
      @input="handleInput"
    />
  </label>
</template>
