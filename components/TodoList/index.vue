<script setup lang="ts">
defineOptions({
  name: 'TodoList'
})

const { todos } = injectUseTodoCollection()
</script>

<template>
  <section class="todo-list">
    <todo-list-item v-for="todo in todos" :key="todo.id" :todo="todo" />
  </section>
</template>

<style scoped>
.todo-list {
  display: grid;
  gap: 2rem;
}
</style>
