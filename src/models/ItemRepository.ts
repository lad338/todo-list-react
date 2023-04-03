import GetItemsResponse from './GetItemsResponse'

interface ItemRepository {
  getItems: (search?: string, skip?: number) => Promise<GetItemsResponse>
  deleteAllItems: () => void
  deleteOne: (id: string) => void
  addItem: (title: string) => void
  doneItem: (id: string, isDone: boolean) => void
  updateItemTitle: (id: string, title: string) => void
}

export default ItemRepository
