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
        <label for="title">タイトル</label>
        <input id="title" v-model="data.title" type="text" />
        <label for="deadline">日時</label>
        <div>
          <ui-date-picker id="deadline" v-model="data.deadline" type="datetime-local" />
        </div>
        <label for="memo">メモ</label>
        <textarea id="memo" v-model="data.memo" rows="5" />
        <button class="add-btn">追加</button>
      </div>
    </fieldset>
  </form>
</template>

<style scoped>
.fields {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 8px;
}
.add-btn {
  grid-column: 1 / 3;
  justify-self: center;
  width: 8rem;
}
</style>
