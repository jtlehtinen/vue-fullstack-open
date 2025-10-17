import { computed } from 'vue'
import { useStorage } from '@vueuse/core'
import loginService from '~/services/login'

export const user = useStorage('user', null, localStorage, {
  serializer: {
    read: (v) => (v ? JSON.parse(v) : null),
    write: (v) => JSON.stringify(v),
  }
})
export const username = computed(() => user.value?.username)
export const isAuthenticated = computed(() => !!user.value)

export async function login(username, password) {
  user.value = await loginService.login(username, password)
}

export async function logout() {
  user.value = null
}

export function getToken() {
  return user.value?.token
}
