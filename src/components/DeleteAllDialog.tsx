import React from 'react'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import {
  initItems,
  selectDeleteDialog,
  selectOnline,
  setDeleteDialogOpen,
  useAppDispatch,
  useAppSelector,
} from '../hooks/redux'
import repository from '../utils/repository'
import { useSnackbar } from 'notistack'

export const DeleteAllDialog: React.FC = () => {
  const dispatch = useAppDispatch()
  const isOpen = useAppSelector(selectDeleteDialog)
  const isOnline = useAppSelector(selectOnline)
  const repo = repository(isOnline)
  const { enqueueSnackbar } = useSnackbar()
  const handleClose = () => {
    dispatch(setDeleteDialogOpen(false))
  }

  const handleDeleteAll = async () => {
    try {
      await repo.deleteAllItems()
      enqueueSnackbar('Successfully deleted all tasks')
    } catch (e) {
      enqueueSnackbar('Failed to deleted all tasks', { variant: 'warning' })
    }
    dispatch(initItems())
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
