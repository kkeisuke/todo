<script setup lang="ts">
defineOptions({
  name: 'TodoAdd'
})

const { data, addTodo } = useAddTodo()

const handleAddFormSubmit = () => {
  addTodo()
}
</script>

<template>
  <form @submit.prevent="handleAddFormSubmit">
    <fieldset>
      <legend>Todo 追加</legend>
      <div class="fields">
        <label for="add-title">タイトル</label>
        <input id="add-title" v-model="data.title" type="text" />
        <label for="add-deadline">日時</label>
        <div>
          <ui-date-picker id="add-deadline" v-model="data.deadline" type="datetime-local" />
        </div>
        <label for="add-memo">メモ</label>
        <textarea id="add-memo" v-model="data.memo" rows="5" />
        <button class="add-btn">追加</button>
      </div>
    </fieldset>
  </form>
</template>

<style scoped>
.fields {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.5rem;
}
.add-btn {
  grid-column: 1 / 3;
  justify-self: center;
  width: 8rem;
}
</style>
