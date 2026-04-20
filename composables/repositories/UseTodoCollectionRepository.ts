import type { Todo, TodoAdd } from '~/types/schema'

export type CollectionTodo = Pick<Todo, 'id' | 'title' | 'memo' | 'deadline' | 'completed_at'>

export const useTodoCollectionRepository = () => {
  const { todos } = useTodoRepository()

  return {
    addTodo(todo: TodoAdd) {
      const deadline = new Date(todo.deadline || Date.now()).toISOString()
      return todos().insert({ ...todo, deadline })
    },
    fetchTodos(params: { showCompleted: boolean }) {
      const query = todos().select('id, title, memo, deadline, completed_at').order('deadline', { ascending: false })
      return params.showCompleted ? query : query.is('completed_at', null)
    }
  }
}
