<script setup lang="ts">
defineOptions({
  name: 'TodoLogin'
})

const { email, loading, login } = useAuth()

const handleLogin = async () => {
  await login()
  navigateTo('/confirm')
}
</script>

<template>
  <form @submit.prevent="handleLogin">
    <input v-model="email" type="email" required autocomplete="email" placeholder="email" />
    <input type="submit" :value="loading ? 'Loading' : 'Send magic link'" :disabled="loading" />
  </form>
</template>

<style scoped></style>
