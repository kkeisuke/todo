import type { Todo, TodoUpdate } from '~/types/schema'

export const useTodoSingle = (todoId: string) => {
  const { getTodoById, updateTodo, completeTodo } = useTodoSingleRepository()

  const { data, refresh, pending } = useAsyncData(`todo:${todoId}`, async () => {
    const { data } = await getTodoById(todoId)
    return data
  })

  return {
    todo: computed(() => data.value),
    pending: computed(() => pending.value),
    async updateTodo(id: Todo['id'], todo: TodoUpdate) {
      await updateTodo(id, todo)
      await refresh()
    },
    async completeTodo(id: Todo['id']) {
      await completeTodo(id)
      await refresh()
    },
    async cancelCompleteTodo(id: Todo['id']) {
      await updateTodo(id, { completed_at: null })
      await refresh()
    }
  }
}

const USE_TODO_SINGLE: InjectionKey<ReturnType<typeof useTodoSingle>> = Symbol('USE_TODO_SINGLE')

export const provideUseTodoSingle = (todoId: string) => {
  const useObj = useTodoSingle(todoId)

  provide(USE_TODO_SINGLE, useObj)

  return useObj
}

export const injectUseTodoSingle = () => {
  const useObj = inject(USE_TODO_SINGLE)

  if (useObj) {
    return useObj
  } else {
    throw new Error('error injectUseTodoSingle')
  }
}
