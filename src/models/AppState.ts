import { TaskLists } from './TaskLists'

export type AppState = {
  taskLists: TaskLists
  isDeleteDialogOpen: boolean
}

export const initialAppState: AppState = {
  taskLists: {
    doneList: [],
    todoList: [],
  },
  isDeleteDialogOpen: false,
}
