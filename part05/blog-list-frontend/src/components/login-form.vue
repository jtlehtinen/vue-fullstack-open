<script setup>
import { ref } from 'vue'
import { login } from '../stores/user.js'

const username = ref('')
const password = ref('')

async function handleLogin() {
  const usernameValue = username.value.trim()
  const passwordValue = password.value

  try {
    await login(usernameValue, passwordValue)
    username.value = ''
  } catch (error) {
    console.error(error)
  } finally {
    password.value = ''
  }
}
</script>

<template>
  <div>
    <h2>Log in to application</h2>
    <form @submit.prevent="handleLogin">
      <div>
        <label>
          Username:
          <input
            type="text"
            v-model="username"
          />
        </label>
      </div>
      <div>
        <label>
          Password:
          <input
            type="password"
            v-model="password"
          />
        </label>
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
</template>