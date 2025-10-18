import { defineStore } from 'pinia'
import { nanoid } from 'nanoid'
import { ref } from 'vue'

export const useNotificationsStore = defineStore('notifications', () => {
  const notifications = ref([])

  function remove(id) {
    notifications.value = notifications.value.filter(n => n.id !== id)
  }

  function info(message, duration = 5000) {
    if (duration <= 0) throw new Error('Duration must be greater than 0')

    const notification = {
      id: nanoid(),
      message,
      type: 'info'
    }

    notifications.value = notifications.value.concat(notification)
    setTimeout(() => remove(notification.id), duration)
  }

  return {
    notifications,

    info,
  }
})
