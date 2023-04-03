import { TaskLists } from './TaskLists'

interface GetTasksResponse extends TaskLists {
  hasMore: boolean
}

export default GetTasksResponse
