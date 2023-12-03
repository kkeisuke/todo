import type { Database } from '~/types/schema'

export const useTodoRepository = () => {
  const client = useSupabaseClient<Database>()

  return {
    todos: client.from('todos')
  }
}
