import GetTasksResponse from './GetTasksResponse'

interface TaskRepository {
  getTasks: (search?: string, skip?: number) => Promise<GetTasksResponse>
  deleteAllTasks: () => void
  deleteOne: (id: string) => void
  addTask: (title: string) => void
  doneTask: (id: string, isDone: boolean) => void
  updateTaskTitle: (id: string, title: string) => void
}

export default TaskRepository
