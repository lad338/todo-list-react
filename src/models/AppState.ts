import { TaskLists } from './TaskLists'

export type AppState = {
  taskLists: TaskLists
  isDeleteDialogOpen: boolean
  search?: string
  todoHasMore: boolean
  todoSkip: number
  isDarkMode: boolean
  isOnline: boolean
}

export const initialAppState: AppState = {
  taskLists: {
    doneList: [],
    todoList: [],
  },
  isDeleteDialogOpen: false,
  todoHasMore: false,
  todoSkip: 0,
  isDarkMode: false,
  isOnline: true,
}
