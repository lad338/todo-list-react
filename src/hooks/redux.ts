import { configureStore, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { initialTaskLists } from '../models/TaskLists'
import { getItems } from './api'

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const selectTodoList = (state: RootState) => state.appState.todoList
export const selectDoneList = (state: RootState) => state.appState.doneList
export const appStateSlice = createSlice({
  name: 'app',
  initialState: initialTaskLists,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadItems.pending, () => {
      console.log('loading items')
    })
    builder.addCase(loadItems.fulfilled, (state, action) => {
      console.log('loaded items')
      state.doneList = action.payload.doneList
      state.todoList = action.payload.todoList
    })
  },
})

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
