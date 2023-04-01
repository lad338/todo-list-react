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
  },
  extraReducers: (builder) => {
    builder.addCase(loadItems.pending, () => {
      console.log('loading items')
    })
    builder.addCase(loadItems.fulfilled, (state, action) => {
      console.log('loaded items')
      state.taskLists.doneList = action.payload.doneList
      state.taskLists.todoList = action.payload.todoList
    })
  },
})

export const { setDeleteDialogOpen, setSearchQuery } = appStateSlice.actions

export const loadItems = createAsyncThunk(
  'appState/loadItems',
  async (query: { search?: string; skip?: number }) => {
    return await getItems(query.search, query.skip)
  }
)
export const store = configureStore({
  reducer: {
    appState: appStateSlice.reducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
