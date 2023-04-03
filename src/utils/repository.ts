import { ApiService } from '../hooks/api'
import { IDBService } from '../hooks/idb'
import TaskRepository from '../models/TaskRepository'

const getRepo = (isOnline: boolean): TaskRepository => {
  return isOnline ? ApiService : IDBService
}

export default getRepo
