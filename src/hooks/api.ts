import GetItemsResponse from '../models/GetItemsResponse'

export const getItems = async (
  search?: string,
  skip?: number
): Promise<GetItemsResponse> => {
  const result = await fetch(
    `http://localhost:8000/items?title=${search || ''}&skip=${skip || ''}`,
    {}
  )
  const resultJson = await result.json()
  return {
    hasMore: resultJson.hasMore,
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
  await fetch(`http://localhost:8000/items`, {
    method: 'DELETE',
  })
}

export const deleteOne = async (id: string) => {
  await fetch(`http://localhost:8000/items/${id}`, {
    method: 'DELETE',
  })
}

export const addItem = async (title: string) => {
  await fetch(`http://localhost:8000/items`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title,
    }),
  })
}

export const doneItem = async (id: string, isDone: boolean) => {
  await fetch(`http://localhost:8000/items/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      isDone,
    }),
  })
}

export const updateItemTitle = async (id: string, title: string) => {
  await fetch(`http://localhost:8000/items/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title,
    }),
  })
}
