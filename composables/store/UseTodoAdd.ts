import type { TodoAdd } from '~/types/schema'

export const useTodoAdd = () => {
  const { addTodo } = useTodoCollectionRepository()

  const getDefaultData = (): TodoAdd => ({
    title: '',
    memo: '',
    deadline: formatDateTimeForInput(new Date().toString())
  })

  const data = reactive<TodoAdd>(getDefaultData())

  return {
    data,
    async addTodo() {
      const res = await addTodo(data)
      Object.assign(data, getDefaultData())
      return res.count
    }
  }
}
