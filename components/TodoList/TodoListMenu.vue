<script setup lang="ts">
defineOptions({
  name: 'TodoListMenu'
})

const router = useRouter()
const { todos, params } = injectUseTodoCollection()

const handleShowCompleted = () => {
  router.push({ query: { completed: params.showCompleted ? '1' : undefined } })
}
</script>

<template>
  <section class="menu">
    <label><input v-model="params.showCompleted" type="checkbox" @change="handleShowCompleted" /> 完了済みを表示</label>
    <span>{{ todos.length }} 件</span>
  </section>
</template>

<style scoped>
.menu {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
