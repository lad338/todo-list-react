import {
  configureStore,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { initialAppState } from '../models/AppState'
import GetTasksResponse from '../models/GetTasksResponse'
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
    builder.addCase(loadTasks.fulfilled, (state, action) => {
      state.taskLists.doneList = action.payload.doneList
      state.taskLists.todoList = action.payload.todoList
      state.todoHasMore = action.payload.hasMore
      state.todoSkip = 0
    })
    builder.addCase(loadMoreTasks.fulfilled, (state, action) => {
      state.taskLists.doneList = action.payload.doneList
      state.taskLists.todoList = [
        ...state.taskLists.todoList,
        ...action.payload.todoList,
      ]
      state.todoHasMore = action.payload.hasMore
    })
    builder.addCase(initTasks.fulfilled, (state, action) => {
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

export const loadTasks = createAsyncThunk<
  GetTasksResponse,
  { search?: string },
  {
    state: RootState
  }
>('appState/loadTasks', async (query: { search?: string }, thunk) => {
  const repo = repository(thunk.getState().appState.isOnline)
  return await repo.getTasks(query.search)
})

export const loadMoreTasks = createAsyncThunk<
  GetTasksResponse,
  { search?: string; skip: number },
  {
    state: RootState
  }
>(
  'appState/loadMoreTasks',
  async (query: { search?: string; skip: number }, thunk) => {
    const repo = repository(thunk.getState().appState.isOnline)
    return await repo.getTasks(query.search, query.skip)
  }
)

export const initTasks = createAsyncThunk<
  GetTasksResponse,
  undefined,
  {
    state: RootState
  }
>('appState/initTasks', async (arg, thunk) => {
  const repo = repository(thunk.getState().appState.isOnline)
  return await repo.getTasks()
})

export const store = configureStore({
  reducer: {
    appState: appStateSlice.reducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
