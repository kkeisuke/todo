<script setup lang="ts">
import type { Todo, TodoUpdate } from '~/types/schema'

defineOptions({
  name: 'TodoDetail'
})
defineProps<{
  todo: Todo
}>()
const emit = defineEmits<{
  deleted: []
}>()

const { updateTodo, completeTodo, cancelCompleteTodo, deleteTodo } = injectUseTodoSingle()

const handleUpdateTodo = (id: Todo['id'], key: keyof TodoUpdate, { target }: Event) => {
  if (!(target instanceof HTMLInputElement) && !(target instanceof HTMLTextAreaElement)) {
    throw new Error(`invalid target: ${target}`)
  }
  updateTodo(id, { [key]: target.value })
}
const handleCompleteTodo = async (id: Todo['id']) => {
  await completeTodo(id)
}
const handleCancelCompleteTodo = async (id: Todo['id']) => {
  await cancelCompleteTodo(id)
}
const handleDeleteTodo = async (id: Todo['id']) => {
  if (window.confirm('削除しますか？') === false) {
    return
  }
  await deleteTodo(id)
  emit('deleted')
}
</script>

<template>
  <dl class="detail">
    <dt>タイトル</dt>
    <dd><input :value="todo.title" type="text" class="edit-title" @change="handleUpdateTodo(todo.id, 'title', $event)" /></dd>
    <dt>日時</dt>
    <dd><ui-date-picker :model-value="formatDateTimeForInput(todo.deadline)" type="datetime-local" @change="handleUpdateTodo(todo.id, 'deadline', $event)" /></dd>
    <dt>メモ</dt>
    <dd><textarea :value="todo.memo" class="edit-memo" @change="handleUpdateTodo(todo.id, 'memo', $event)" /></dd>
    <dt>更新日</dt>
    <dd>{{ formatDateTime(todo.updated_at) }}</dd>
    <dt>作成日</dt>
    <dd>{{ formatDateTime(todo.created_at) }}</dd>
    <dt>完了日</dt>
    <dd class="complete">
      <div v-if="todo.completed_at">
        {{ formatDateTime(todo.completed_at) }}
      </div>
      <template v-if="!todo.completed_at">
        <button type="button" @click="handleCompleteTodo(todo.id)">完了する</button>
      </template>
      <template v-else>
        <button type="button" @click="handleCancelCompleteTodo(todo.id)">取り消す</button>
      </template>
    </dd>
    <dd class="delete"><button type="button" @click="handleDeleteTodo(todo.id)">削除する</button></dd>
  </dl>
</template>

<style scoped>
.detail {
  display: grid;
  grid-template-columns: auto 1fr;
  column-gap: 2rem;
  row-gap: 1rem;
}
.complete {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.edit-title {
  width: 100%;
  box-sizing: border-box;
}
.edit-memo {
  width: 100%;
  box-sizing: border-box;
  field-sizing: content;
  min-height: 10lh;
  resize: vertical;
}
.delete {
  grid-column: 2 / 3;
  text-align: right;
}
</style>
