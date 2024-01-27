<script setup lang="ts">
import type { TodoUpdate } from '~/types/schema'

defineOptions({
  name: 'TodoListItem'
})
defineProps<{
  todo: CollectionTodo
}>()

const { updateTodo } = injectUseTodoCollection()

const handleUpdateTodo = (id: CollectionTodo['id'], key: keyof TodoUpdate, { target }: Event) => {
  if (!(target instanceof HTMLInputElement) && !(target instanceof HTMLTextAreaElement)) {
    throw new Error(`invalid target: ${target}`)
  }
  updateTodo(id, { [key]: target.value })
}
</script>

<template>
  <div class="todo-list-item">
    <div class="header">
      <input :value="todo.title" type="text" class="title" @change="handleUpdateTodo(todo.id, 'title', $event)" />
      <nuxt-link :to="`/${todo.id}`" class="to-detail">
        <button type="button">詳細</button>
      </nuxt-link>
    </div>
    <div class="property">
      <label :for="`edit-deadline-${todo.id}`">日時</label>
      <ui-date-picker :id="`edit-deadline-${todo.id}`" :model-value="`${formatDateTimeForInput(todo.deadline)}`" type="datetime-local" @change="handleUpdateTodo(todo.id, 'deadline', $event)" />
    </div>
    <div class="property">
      <label :for="`edit-memo-${todo.id}`">メモ</label>
      <textarea :id="`edit-memo-${todo.id}`" class="edit-memo" :value="todo.memo" rows="3" @change="handleUpdateTodo(todo.id, 'memo', $event)" />
    </div>
  </div>
</template>

<style scoped>
.todo-list-item {
  display: grid;
  gap: 0.5rem;
}
.header {
  display: flex;
  gap: 0.5rem;

  .title {
    flex-basis: 100%;
  }

  .to-detail {
    white-space: nowrap;
  }
}
.property {
  display: grid;
  grid-template-columns: 2.5rem auto;
  gap: 0.5rem;
}
.edit-memo {
  resize: vertical;
}
</style>
