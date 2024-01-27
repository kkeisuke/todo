<script setup lang="ts">
const route = useRoute()
if (typeof route.params.id !== 'string') {
  throw new Error('invalid id')
}
const { todo, pending } = provideUseTodoSingle(route.params.id)
</script>

<template>
  <nuxt-layout>
    <main class="main">
      <todo-header />
      <todo-detail v-if="todo" :todo="todo" />
      <div v-else-if="pending">loading...</div>
      <div v-else>not found</div>
    </main>
  </nuxt-layout>
</template>

<style scoped>
.main {
  display: grid;
  gap: 3rem;
}
</style>
