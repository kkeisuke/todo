import type { Todo, TodoUpdate } from '~/types/schema'

export const useTodoCollection = (userId: string) => {
  const route = useRoute()
  const { fetchTodos } = useTodoCollectionRepository()
  const { updateTodo } = useTodoSingleRepository()

  const params = reactive({
    showCompleted: route.query.completed === '1'
  })

  const { data, refresh } = useAsyncData(`todos:${userId}`, async () => {
    const { data } = await fetchTodos()
    return data
  })

  return {
    todos: computed(() => (data.value || []).filter((todo) => (params.showCompleted ? true : todo.completed_at === null))),
    params,
    refreshTodos: refresh,
    updateTodo: async (id: Todo['id'], todo: TodoUpdate) => {
      await updateTodo(id, todo)
      await refresh()
    }
  }
}
const USE_TODO_COLLECTION: InjectionKey<ReturnType<typeof useTodoCollection>> = Symbol('USE_TODO_COLLECTION')

export const provideUseTodoCollection = (userId: string) => {
  const useObj = useTodoCollection(userId)

  provide(USE_TODO_COLLECTION, useObj)

  return useObj
}

export const injectUseTodoCollection = () => {
  const useObj = inject(USE_TODO_COLLECTION)

  if (useObj) {
    return useObj
  } else {
    throw new Error('error injectUseTodoCollection')
  }
}
