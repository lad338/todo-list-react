import GetTasksResponse from '../models/GetTasksResponse'
import TaskRepository from '../models/TaskRepository'

const getTasks = async (
  search?: string,
  skip?: number
): Promise<GetTasksResponse> => {
  const result = await fetch(
    `http://localhost:8000/tasks?title=${search || ''}&skip=${skip || ''}`,
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

const deleteAllTasks = async () => {
  await fetch(`http://localhost:8000/tasks`, {
    method: 'DELETE',
  })
}

const deleteOne = async (id: string) => {
  await fetch(`http://localhost:8000/tasks/${id}`, {
    method: 'DELETE',
  })
}

const addTask = async (title: string) => {
  await fetch(`http://localhost:8000/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title,
    }),
  })
}

const doneTask = async (id: string, isDone: boolean) => {
  await fetch(`http://localhost:8000/tasks/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      isDone,
    }),
  })
}

const updateTaskTitle = async (id: string, title: string) => {
  await fetch(`http://localhost:8000/tasks/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title,
    }),
  })
}

export const healthCheck = async () => {
  try {
    const health = await fetch(`http://localhost:8000/health`)
    return health.status === 200
  } catch (e) {
    return false
  }
}

export const ApiService: TaskRepository = {
  addTask: addTask,
  deleteAllTasks,
  deleteOne,
  doneTask: doneTask,
  getTasks: getTasks,
  updateTaskTitle: updateTaskTitle,
}
