import React from 'react'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import { deleteAllItems } from '../hooks/api'
import {
  loadItems,
  selectDeleteDialog,
  setDeleteDialogOpen,
  useAppDispatch,
  useAppSelector,
} from '../hooks/redux'

export const DeleteAllDialog: React.FC = () => {
  const dispatch = useAppDispatch()
  const isOpen = useAppSelector(selectDeleteDialog)
  const handleClose = () => {
    dispatch(setDeleteDialogOpen(false))
  }

  const handleDeleteAll = async () => {
    await deleteAllItems()
    dispatch(loadItems({}))
    handleClose()
  }
  return (
    <Dialog
      open={isOpen}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{'Delete all tasks?'}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Deleting all tasks is an irreversible action.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>CANCEL</Button>
        <Button onClick={handleDeleteAll} autoFocus>
          CONFIRM DELETE
        </Button>
      </DialogActions>
    </Dialog>
  )
}
