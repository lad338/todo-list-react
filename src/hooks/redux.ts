import {
  configureStore,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { getItems } from './api'
import { initialAppState } from '../models/AppState'

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

export const { setDeleteDialogOpen, setSearchQuery, setSkip } =
  appStateSlice.actions

export const loadItems = createAsyncThunk(
  'appState/loadItems',
  async (query: { search?: string }) => {
    return await getItems(query.search)
  }
)

export const loadMoreItems = createAsyncThunk(
  'appState/loadMoreItems',
  async (query: { search?: string; skip: number }) => {
    return await getItems(query.search, query.skip)
  }
)

export const initItems = createAsyncThunk('appState/initItems', async () => {
  return await getItems()
})
export const store = configureStore({
  reducer: {
    appState: appStateSlice.reducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
