import React, { useRef } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import SendIcon from '@mui/icons-material/Send'
import IconButton from '@mui/material/IconButton'
import { selectOnline, useAppDispatch, useAppSelector } from '../hooks/redux'
import { addTaskAndRefresh } from '../hooks/app'
import { useSnackbar } from 'notistack'

export const UpperBarSmall: React.FC = () => {
  const dispatch = useAppDispatch()
  const isOnline = useAppSelector(selectOnline)
  const formRef = useRef<HTMLFormElement>(null)
  const { enqueueSnackbar } = useSnackbar()
  const handleAddTask = async (event: React.FormEvent<HTMLFormElement>) => {
    await addTaskAndRefresh(dispatch, isOnline, formRef, event, enqueueSnackbar)
  }

  return (
    <form onSubmit={handleAddTask} ref={formRef}>
      <Box
        width="100%"
        sx={{
          display: { xs: 'flex', md: 'none' },
          flexDirection: 'row',
        }}
      >
        <TextField
          sx={{ flexGrow: 1 }}
          name="new-task-title"
          label="Add task"
          variant="filled"
          size="small"
        />
        <IconButton sx={{ color: '#fefefe', width: 48 }} type="submit">
          <SendIcon />
        </IconButton>
      </Box>
    </form>
  )
}
