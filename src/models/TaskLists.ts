import TaskItem from './TaskItem'

export interface TaskLists {
  todoList: TaskItem[]
  doneList: TaskItem[]
}

export const initialTaskLists: TaskLists = {
  todoList: [],
  doneList: [],
}
