import React from 'react'
import { addItem } from './api'
import { initItems } from './redux'

export const addItemAndRefresh = async (
  dispatch: any,
  event: React.FormEvent<HTMLFormElement>
) => {
  event.preventDefault()
  const formData = new FormData(event.currentTarget)
  const title = (formData.get('new-item-title') || '').toString().trim()
  if (title !== '') {
    await addItem(title)
    dispatch(initItems())
  }
}
