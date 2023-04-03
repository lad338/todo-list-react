import Dexie, { Table } from 'dexie'
import { ItemEntity, NewItemEntity } from '../models/idb/ItemEntity'
import ItemRepository from '../models/ItemRepository'
import GetItemsResponse from '../models/GetItemsResponse'

class DexieDB extends Dexie {
  item!: Table<ItemEntity>

  constructor() {
    super('todo-list')
    this.version(1).stores({
      item: '&id, title, doneTime',
    })
  }
}

export const DB = new DexieDB()
const addItem = async (title: string) => {
  await DB.item.add(NewItemEntity(title))
}
const deleteAllItems = async () => {
  await DB.item.clear()
}

const deleteOne = async (id: string) => {
  await DB.item.delete(id)
}

const doneItem = async (id: string, isDone: boolean) => {
  await DB.item.update(id, { doneTime: isDone ? Date.now() : undefined })
}

const getItems = async (
  search?: string,
  skip?: number
): Promise<GetItemsResponse> => {
  const filter = (item: ItemEntity) => {
    return (
      item.doneTime === undefined &&
      (search === undefined ||
        item.title.toLowerCase().startsWith(search.toLowerCase()))
    )
  }

  const count = await DB.item
    .where('title')
    .startsWith(search || '')
    .filter((item) => item.doneTime === undefined)
    .count()

  const todoTemp = skip
    ? await DB.item
        .orderBy('title')
        .filter(filter)
        .offset(skip)
        .limit(15)
        .toArray()
    : await DB.item.orderBy('title').filter(filter).limit(15).toArray()

  const todoItems = todoTemp.map((it) => ({
    id: it.id,
    title: it.title,
    isDone: false,
  }))

  const doneItems = (
    await DB.item
      .orderBy('doneTime')
      .reverse()
      .filter(
        (item) =>
          item.doneTime !== undefined &&
          (search === undefined ||
            item.title.toLowerCase().startsWith(search.toLowerCase()))
      )
      .limit(10)
      .toArray()
  ).map((it) => ({ id: it.id, title: it.title, isDone: true }))

  return {
    doneList: doneItems,
    todoList: todoItems,
    hasMore: count > todoItems.length + (skip || 0),
  }
}

const updateItemTitle = async (id: string, title: string) => {
  await DB.item.update(id, { title })
}

export const IDBService: ItemRepository = {
  addItem,
  deleteAllItems,
  deleteOne,
  doneItem,
  getItems,
  updateItemTitle,
}
