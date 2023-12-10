export const useAddTodo = () => {
  const { data, addTodo } = useTodoAdd()
  const { refreshTodos } = injectUseTodoCollection()

  return {
    data,
    async addTodo() {
      await addTodo()
      await refreshTodos()
    }
  }
}
