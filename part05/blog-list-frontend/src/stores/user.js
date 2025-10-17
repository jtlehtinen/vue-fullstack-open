import { computed } from 'vue'
import { useStorage } from '@vueuse/core'

export const user = useStorage('user', null, localStorage, {
  serializer: {
    read: (v) => (v ? JSON.parse(v) : null),
    write: (v) => JSON.stringify(v),
  }
})
export const username = computed(() => user.value?.username)
export const isAuthenticated = computed(() => !!user.value)

export function setUser(newUser) {
  user.value = newUser
}

export function getToken() {
  return user.value?.token
}

export function getUsername() {
  return user.value?.username
}
