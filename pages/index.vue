<script setup lang="ts">
const user = useSupabaseUser()
user.value?.id && provideUseTodoCollection(user.value.id)
</script>

<template>
  <nuxt-layout>
    <main class="main">
      <todo-header />
      <todo-add />
      <todo-list-menu />
      <todo-list />
    </main>
  </nuxt-layout>
</template>

<style scoped>
.main {
  display: grid;
  gap: 1.5rem;
}
</style>
