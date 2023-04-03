import React from 'react'
import IconButton from '@mui/material/IconButton'
import {
  initTasks,
  selectOnline,
  setOnline,
  useAppDispatch,
  useAppSelector,
} from '../hooks/redux'
import CloudQueueIcon from '@mui/icons-material/CloudQueue'
import CloudOffIcon from '@mui/icons-material/CloudOff'
import { checkOnline } from '../hooks/app'
import { useSnackbar } from 'notistack'

export const OnlineIcon: React.FC = () => {
  const dispatch = useAppDispatch()
  const isOnline = useAppSelector(selectOnline)
  const { enqueueSnackbar } = useSnackbar()

  const toggleOnline = () => {
    if (isOnline) {
      enqueueSnackbar('Turning to offline mode')
      dispatch(setOnline(false))
      dispatch(initTasks())
    } else {
      checkOnline().then((isBackendAvailable) => {
        if (isBackendAvailable) {
          enqueueSnackbar('Turning to online mode')
          dispatch(setOnline(true))
          dispatch(initTasks())
        } else {
          enqueueSnackbar('Backend unavailable. Using offline mode', {
            variant: 'error',
          })
        }
      })
    }
  }

  return (
    <IconButton
      sx={{ mx: 1, height: 40, width: 40, my: 'auto' }}
      onClick={toggleOnline}
      color="inherit"
    >
      {isOnline ? <CloudQueueIcon /> : <CloudOffIcon />}
    </IconButton>
  )
}
