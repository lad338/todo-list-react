import { TaskLists } from './TaskLists'

interface GetItemsResponse extends TaskLists {
  hasMore: boolean
}

export default GetItemsResponse
