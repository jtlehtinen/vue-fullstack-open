import { ref } from 'vue'

export function useNotification() {
  const notification = ref()

  function set(message, type) {
    notification.value = { message, type }

    setTimeout(() => {
      notification.value = undefined
    }, 6000)
  }

  function info(message) {
    set(message, 'info')
  }

  function success(message) {
    set(message, 'success')
  }

  function error(message) {
    set(message, 'error')
  }

  return {
    notification,
    info,
    success,
    error,
  }
}
