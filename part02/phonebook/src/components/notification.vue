<script setup>
defineProps({
  message: String,
  type: String
})
</script>

<template>
  <div v-if="message"
    class="notification"
    :class="type"
  >
    {{ message }}
  </div>
</template>

<style scoped>
.notification {
  padding: 0.25rem 1rem;
  border-radius: 0.25rem;
}

.notification.error {
  background-color: rgb(255, 235, 235);
  color: rgb(203, 42, 47);
}

.notification.info {
  background-color: rgb(235, 245, 255);
  color: rgb(0, 104, 214);
}

.notification.success {
  background-color: rgb(229, 250, 246);
  color: rgb(6, 122, 110);
}
</style>
