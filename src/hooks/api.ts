import { TaskLists } from '../models/TaskLists'

export const getItems = async (
  search?: string,
  skip?: number
): Promise<TaskLists> => {
  const result = await fetch(
    `http://localhost:8000/items?title=${search || ''}&skip=${skip || ''}`,
    {}
  )
  const resultJson = await result.json()
  return {
    todoList: resultJson.undone.map((it: { _id: string; title: string }) => {
      return {
        id: it._id,
        title: it.title,
        isDone: false,
      }
    }),
    doneList: resultJson.done.map((it: { _id: string; title: string }) => {
      return {
        id: it._id,
        title: it.title,
        isDone: true,
      }
    }),
  }
}

export const deleteAllItems = async () => {
  const result = await fetch(`http://localhost:8000/items`, {
    method: 'DELETE',
  })
}
