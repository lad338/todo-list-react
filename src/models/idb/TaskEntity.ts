export interface TaskEntity {
  id: string
  title: string
  lowerCaseTitle: string
  doneTime?: number
}

export const NewTask = (title: string): TaskEntity => {
  return {
    id: crypto.randomUUID(),
    lowerCaseTitle: title.toLowerCase(),
    title,
  }
}
