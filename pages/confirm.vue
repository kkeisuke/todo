<script setup lang="ts">
const user = useSupabaseUser()
watch(
  user,
  () => {
    if (user.value) {
      return navigateTo('/')
    }
  },
  { immediate: true }
)
</script>

<template>
  <nuxt-layout>
    <main class="main">
      <todo-header />
      <div>Waiting for login...</div>
    </main>
  </nuxt-layout>
</template>

<style scoped>
.main {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
</style>
