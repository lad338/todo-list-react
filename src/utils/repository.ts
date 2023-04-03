import { ApiService } from '../hooks/api'
import { IDBService } from '../hooks/idb'
import ItemRepository from '../models/ItemRepository'

const getRepo = (isOnline: boolean): ItemRepository => {
  return isOnline ? ApiService : IDBService
}

export default getRepo
