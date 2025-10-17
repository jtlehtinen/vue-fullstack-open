<script setup>
defineProps({
  openLabel: {
    type: String,
    required: true
  },
  closeLabel: {
    type: String,
    default: 'Cancel'
  },
})

const open = defineModel({
  type: Boolean,
  required: true
})

function toggle() {
  open.value = !open.value
}
</script>

<template>
  <div>
    <div v-if="open">
      <slot />
      <button @click="toggle">{{ closeLabel }}</button>
    </div>
    <div v-else>
      <button @click="toggle">{{ openLabel }}</button>
    </div>
  </div>
</template>