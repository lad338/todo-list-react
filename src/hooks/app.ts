import React from 'react'
import { ApiService, healthCheck } from './api'
import { initTasks } from './redux'
import { IDBService } from './idb'
import { EnqueueSnackbar } from 'notistack'
import { trimTask } from '../utils/taskTItle'

export const addTaskAndRefresh = async (
  dispatch: any,
  isOnline: boolean,
  formRef: React.RefObject<HTMLFormElement>,
  event: React.FormEvent<HTMLFormElement>,
  enqueueSnackbar: EnqueueSnackbar
) => {
  event.preventDefault()
  const formData = new FormData(event.currentTarget)
  const title = (formData.get('new-task-title') || '').toString().trim()
  if (title !== '') {
    const repo = isOnline ? ApiService : IDBService
    await repo.addTask(title)
    formRef.current?.reset()
    dispatch(initTasks())
    enqueueSnackbar(`Added Task: ${trimTask(title, 30)}`)
  }
}

export const checkOnline = async () => {
  return healthCheck()
}
