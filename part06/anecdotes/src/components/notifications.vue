<script setup>
import { storeToRefs } from 'pinia'
import Notification from '~/components/notification.vue'
import { useNotificationsStore } from '~/stores/notifications'

const { notifications } = storeToRefs(useNotificationsStore())
</script>

<template>
  <Notification
    v-for="n in notifications"
    :key="n.id"
    :type="n.type"
    :message="n.message"
  />
</template>
