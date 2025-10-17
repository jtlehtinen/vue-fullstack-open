<script setup>
import { ref } from 'vue'
import LoginForm from '~/components/login-form.vue'
import Notification from '~/components/notification.vue'
import { useNotification } from '~/composables/use-notification'
import { login } from '~/stores/user'

const { notification, error: showError } = useNotification()

const username = ref('')
const password = ref('')

async function handleSubmitLoginForm(usernameValue, passwordValue) {

  try {
    await login(usernameValue, passwordValue)
    username.value = ''
  } catch (error) {
    const message = error.response?.data.error || 'unknown error occurred'
    showError(message)
  } finally {
    password.value = ''
  }
}
</script>

<template>
  <div>
    <h2>Log in to application</h2>
    <Notification
      v-if="notification"
      class="notification"
      :message="notification.message"
      :type="notification.type"
    />
    <LoginForm
      :username="username"
      :password="password"
      @update:username="username = $event"
      @update:password="password = $event"
      @submit="handleSubmitLoginForm"
    />
  </div>
</template>

<style scoped>
.notification {
  margin-bottom: 1em;
}
</style>