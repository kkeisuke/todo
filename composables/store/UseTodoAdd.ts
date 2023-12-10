import type { TodoAdd } from '~/types/schema'

export const useTodoAdd = () => {
  const { addTodo } = useTodoCollectionRepository()

  const data = reactive<TodoAdd>({
    title: '',
    memo: '',
    deadline: formatDateTimeForInput(new Date().toString())
  })

  return {
    data,
    async addTodo() {
      const res = await addTodo(data)
      return res.count
    }
  }
}
