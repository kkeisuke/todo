<script setup lang="ts">
const user = useSupabaseUser()
user.value && navigateTo('/')
</script>

<template>
  <nuxt-layout>
    <main class="main">
      <todo-header />
      <todo-login />
    </main>
  </nuxt-layout>
</template>

<style scoped>
.main {
  display: grid;
  gap: 2rem;
}
</style>
