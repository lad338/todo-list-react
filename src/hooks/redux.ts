import {
  configureStore,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { initialAppState } from '../models/AppState'
import GetItemsResponse from '../models/GetItemsResponse'
import repository from '../utils/repository'

export const useAppDispatch = () => useDispatch<AppDispatch>()

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const selectTodoList = (state: RootState) =>
  state.appState.taskLists.todoList
export const selectDoneList = (state: RootState) =>
  state.appState.taskLists.doneList
export const selectDeleteDialog = (state: RootState) =>
  state.appState.isDeleteDialogOpen
export const selectSearchQuery = (state: RootState) => state.appState.search
export const selectHasMore = (state: RootState) => state.appState.todoHasMore
export const selectSkip = (state: RootState) => state.appState.todoSkip
export const selectDarkMode = (state: RootState) => state.appState.isDarkMode
export const selectOnline = (state: RootState) => state.appState.isOnline

export const appStateSlice = createSlice({
  name: 'app',
  initialState: initialAppState,
  reducers: {
    setDeleteDialogOpen: (state, action: PayloadAction<boolean>) => {
      state.isDeleteDialogOpen = action.payload
    },
    setSearchQuery: (state, action: PayloadAction<string | undefined>) => {
      state.search = action.payload
    },
    setSkip: (state, action: PayloadAction<number>) => {
      state.todoSkip = action.payload
    },
    setDarkMode: (state, action: PayloadAction<boolean>) => {
      state.isDarkMode = action.payload
    },
    setOnline: (state, action: PayloadAction<boolean>) => {
      state.isOnline = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadItems.fulfilled, (state, action) => {
      state.taskLists.doneList = action.payload.doneList
      state.taskLists.todoList = action.payload.todoList
      state.todoHasMore = action.payload.hasMore
      state.todoSkip = 0
    })
    builder.addCase(loadMoreItems.fulfilled, (state, action) => {
      state.taskLists.doneList = action.payload.doneList
      state.taskLists.todoList = [
        ...state.taskLists.todoList,
        ...action.payload.todoList,
      ]
      state.todoHasMore = action.payload.hasMore
    })
    builder.addCase(initItems.fulfilled, (state, action) => {
      state.taskLists.doneList = action.payload.doneList
      state.taskLists.todoList = action.payload.todoList
      state.todoHasMore = action.payload.hasMore
      state.todoSkip = 0
      state.search = ''
    })
  },
})

export const {
  setDeleteDialogOpen,
  setSearchQuery,
  setSkip,
  setDarkMode,
  setOnline,
} = appStateSlice.actions

export const loadItems = createAsyncThunk<
  GetItemsResponse,
  { search?: string },
  {
    state: RootState
  }
>('appState/loadItems', async (query: { search?: string }, thunk) => {
  const repo = repository(thunk.getState().appState.isOnline)
  return await repo.getItems(query.search)
})

export const loadMoreItems = createAsyncThunk<
  GetItemsResponse,
  { search?: string; skip: number },
  {
    state: RootState
  }
>(
  'appState/loadMoreItems',
  async (query: { search?: string; skip: number }, thunk) => {
    const repo = repository(thunk.getState().appState.isOnline)
    return await repo.getItems(query.search, query.skip)
  }
)

export const initItems = createAsyncThunk<
  GetItemsResponse,
  undefined,
  {
    state: RootState
  }
>('appState/initItems', async (arg, thunk) => {
  const repo = repository(thunk.getState().appState.isOnline)
  return await repo.getItems()
})

export const store = configureStore({
  reducer: {
    appState: appStateSlice.reducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
