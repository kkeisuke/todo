<script setup lang="ts">
import type { Todo } from '~/types/schema'

defineOptions({
  name: 'TodoDetail'
})
defineProps<{
  todo: Todo
}>()
const emit = defineEmits<{
  deleted: []
}>()

const { completeTodo, cancelCompleteTodo, deleteTodo } = injectUseTodoSingle()

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
    <dd>{{ todo.title }}</dd>
    <dt>日時</dt>
    <dd>{{ formatDateTime(todo.deadline) }}</dd>
    <dt>メモ</dt>
    <dd class="memo">{{ todo.memo }}</dd>
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
.memo {
  white-space: pre-wrap;
  overflow-wrap: anywhere;
}
.delete {
  grid-column: 2 / 3;
  text-align: right;
}
</style>
