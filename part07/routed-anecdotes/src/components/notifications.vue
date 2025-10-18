<script setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useNotificationsStore } from '~/stores/notifications'

const notificationsStore = useNotificationsStore()
const { notifications } = storeToRefs(notificationsStore)

const hasNotifications = computed(() => notifications.value.length > 0)
</script>

<template>
  <div v-if="hasNotifications">
    <p v-for="notification of notifications" :key="notification.id">
      {{ notification.message }}
    </p>
  </div>
</template>