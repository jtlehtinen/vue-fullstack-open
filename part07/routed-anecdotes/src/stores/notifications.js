import { defineStore } from 'pinia'
import { nanoid } from 'nanoid'
import { ref } from 'vue'

export const useNotificationsStore = defineStore('notifications', () => {
  const notifications = ref([])

  function remove(id) {
    notifications.value = notifications.value.filter(n => n.id !== id)
  }

  function info(message, duration = 5000) {
    const id = nanoid()
    notifications.value = notifications.value.concat({ id, message })

    setTimeout(() => remove(id), duration)
  }

  return {
    notifications,

    info,
  }
})
