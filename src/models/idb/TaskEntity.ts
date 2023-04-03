export interface TaskEntity {
  id: string
  title: string
  doneTime?: number
}

export const NewTask = (title: string): TaskEntity => {
  return {
    id: crypto.randomUUID(),
    title,
  }
}
