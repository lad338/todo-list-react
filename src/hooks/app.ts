import React from 'react'
import { ApiService, healthCheck } from './api'
import { initItems } from './redux'
import { IDBService } from './idb'

export const addItemAndRefresh = async (
  dispatch: any,
  isOnline: boolean,
  formRef: React.RefObject<HTMLFormElement>,
  event: React.FormEvent<HTMLFormElement>
) => {
  event.preventDefault()
  const formData = new FormData(event.currentTarget)
  const title = (formData.get('new-item-title') || '').toString().trim()
  if (title !== '') {
    const repo = isOnline ? ApiService : IDBService
    await repo.addItem(title)
    formRef.current?.reset()
    dispatch(initItems())
  }
}

export const checkOnline = async () => {
  return healthCheck()
}
