import type { Todo, TodoAdd } from '~/types/schema'

export type CollectionTodo = Pick<Todo, 'id' | 'title' | 'memo' | 'deadline' | 'completed_at'>

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
