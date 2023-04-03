export interface ItemEntity {
  id: string
  title: string
  doneTime?: number
}

export const NewItemEntity = (title: string): ItemEntity => {
  return {
    id: crypto.randomUUID(),
    title,
  }
}
