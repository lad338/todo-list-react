import React from 'react'
import Box from '@mui/material/Box'
import DeleteIcon from '@mui/icons-material/Delete'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { setDeleteDialogOpen, useAppDispatch } from '../hooks/redux'

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
      <Typography variant="h2" sx={{ flexGrow: 1 }}>
        Marvelous v2.0
      </Typography>
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
  )
}
