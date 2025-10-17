<script setup>
const props = defineProps({
  username: { type: String, required: true },
  password: { type: String, required: true },
})

const emit = defineEmits([
  'update:username',
  'update:password',
  'submit'
])

function updateUsername(event) {
  emit('update:username', event.target.value)
}

function updatePassword(event) {
  emit('update:password', event.target.value)
}

async function handleLogin() {
  const usernameValue = props.username.trim()
  const passwordValue = props.password
  emit('submit', usernameValue, passwordValue)
}
</script>

<template>
  <form @submit.prevent="handleLogin">
    <div>
      <label>
        Username:
        <input
          type="text"
          name="username"
          :value="username"
          @input="updateUsername"
        />
      </label>
    </div>
    <div>
      <label>
        Password:
        <input
          type="password"
          name="password"
          :value="password"
          @input="updatePassword"
        />
      </label>
    </div>
    <button type="submit">Login</button>
  </form>
</template>