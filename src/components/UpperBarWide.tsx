import React from 'react'
import Box from '@mui/material/Box'
import DeleteIcon from '@mui/icons-material/Delete'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { setDeleteDialogOpen, useAppDispatch } from '../hooks/redux'
import { DarkModeButton } from './DarkModeButton'
import { OnlineIcon } from './OnlineIcon'

export const UpperBarWide: React.FC = () => {
  const dispatch = useAppDispatch()
  const handleDeleteClick = () => {
    dispatch(setDeleteDialogOpen(true))
  }

  return (
    <Box
      width="100%"
      sx={{ display: { xs: 'none', md: 'flex' }, flexDirection: 'row' }}
    >
      <Box sx={{ flexGrow: 1, flexDirection: 'row', display: 'flex' }}>
        <Typography variant="h2">Marvelous v2.0</Typography>
        <OnlineIcon />
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          height: '100%',
          margin: 'auto',
        }}
      >
        <DarkModeButton />
        <Button
          sx={{
            height: '100%',
            color: '#fefefe',
            marginY: 'auto',
          }}
          variant="outlined"
          startIcon={<DeleteIcon />}
          onClick={handleDeleteClick}
        >
          Delete all tasks
        </Button>
      </Box>
    </Box>
  )
}
