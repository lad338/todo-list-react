import Dexie, { Table } from 'dexie'
import { TaskEntity, NewTask } from '../models/idb/TaskEntity'
import TaskRepository from '../models/TaskRepository'
import GetTasksResponse from '../models/GetTasksResponse'

class DexieDB extends Dexie {
  task!: Table<TaskEntity>

  constructor() {
    super('todo-list')
    this.version(1).stores({
      task: '&id, title, doneTime',
    })
  }
}

export const DB = new DexieDB()
const addTask = async (title: string) => {
  await DB.task.add(NewTask(title))
}
const deleteAllTasks = async () => {
  await DB.task.clear()
}

const deleteOne = async (id: string) => {
  await DB.task.delete(id)
}

const doneTask = async (id: string, isDone: boolean) => {
  await DB.task.update(id, { doneTime: isDone ? Date.now() : undefined })
}

const getTasks = async (
  search?: string,
  skip?: number
): Promise<GetTasksResponse> => {
  const filter = (task: TaskEntity) => {
    return (
      task.doneTime === undefined &&
      (search === undefined ||
        task.title.toLowerCase().startsWith(search.toLowerCase()))
    )
  }

  const count = await DB.task
    .where('title')
    .startsWith(search || '')
    .filter((task) => task.doneTime === undefined)
    .count()

  const todoTemp = skip
    ? await DB.task
        .orderBy('title')
        .filter(filter)
        .offset(skip)
        .limit(15)
        .toArray()
    : await DB.task.orderBy('title').filter(filter).limit(15).toArray()

  const todoItems = todoTemp.map((it) => ({
    id: it.id,
    title: it.title,
    isDone: false,
  }))

  const doneItems = (
    await DB.task
      .orderBy('doneTime')
      .reverse()
      .filter((task) => task.doneTime !== undefined)
      .limit(10)
      .filter((task) => search === undefined || task.title.startsWith(search))
      .reverse()
      .sortBy('title')
  ).map((it) => ({ id: it.id, title: it.title, isDone: true }))

  return {
    doneList: doneItems,
    todoList: todoItems,
    hasMore: count > todoItems.length + (skip || 0),
  }
}

const updateTaskTitle = async (id: string, title: string) => {
  await DB.task.update(id, { title })
}

export const IDBService: TaskRepository = {
  addTask,
  deleteAllTasks,
  deleteOne,
  doneTask,
  getTasks,
  updateTaskTitle,
}
