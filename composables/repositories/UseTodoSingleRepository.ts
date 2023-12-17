import type { Todo, TodoUpdate } from '~/types/schema'

export const useTodoSingleRepository = () => {
  const { todos } = useTodoRepository()

  return {
    getTodoById(id: Todo['id']) {
      return todos.select('id, title, memo, deadline, completed_at, updated_at, created_at').eq('id', id).single()
    },
    updateTodo(id: Todo['id'], todo: TodoUpdate) {
      if (todo.deadline) {
        todo.deadline = new Date(todo.deadline).toISOString()
      }
      return todos.update({ ...todo, updated_at: new Date().toISOString() }).eq('id', id)
    },
    completeTodo(id: Todo['id']) {
      return todos.update({ completed_at: new Date().toISOString(), updated_at: new Date().toISOString() }).eq('id', id)
    }
  }
}
