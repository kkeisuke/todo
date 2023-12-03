import type { TodoAdd } from '~/types/schema'

export const useTodoCollectionRepository = () => {
  const { todos } = useTodoRepository()

  return {
    addTodo(todo: TodoAdd) {
      todo.deadline = new Date(todo.deadline || Date.now()).toISOString()
      return todos.insert(todo)
    },
    fetchTodos() {
      return todos.select('id, title, memo, deadline, completed_at').order('deadline', { ascending: false })
    }
  }
}
