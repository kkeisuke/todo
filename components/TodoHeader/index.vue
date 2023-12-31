<script setup lang="ts">
defineOptions({
  name: 'TodoHeader'
})

const user = useSupabaseUser()
const { logout } = useAuth()

const handleLogout = async () => {
  await logout()
  navigateTo('/login')
}
</script>

<template>
  <header class="header">
    <div class="logo">
      <nuxt-link to="/">Todo</nuxt-link>
    </div>
    <ul v-if="user" class="user-info">
      <li>{{ user.email }}</li>
      <li><button type="button" @click="handleLogout">logout</button></li>
    </ul>
  </header>
</template>

<style scoped>
.header {
  display: grid;
  gap: 1rem;
}
.logo {
  margin: 0;
  font-size: 2rem;
  font-weight: bold;
  & > a {
    text-decoration: none;
    color: inherit;
  }
}
.user-info {
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  list-style: none;
}
</style>
