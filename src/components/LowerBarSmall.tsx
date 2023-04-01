import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import { setDeleteDialogOpen, useAppDispatch } from '../hooks/redux'

export const LowerBarSmall: React.FC = () => {
  const dispatch = useAppDispatch()
  const handleDeleteClick = () => {
    dispatch(setDeleteDialogOpen(true))
  }

  return (
    <Box
      width="100%"
      sx={{
        display: { xs: 'flex', md: 'none' },
        flexDirection: 'row',
      }}
    >
      <TextField
        sx={{ flexGrow: 1 }}
        id="filled-basic"
        label="Search.."
        variant="filled"
        size="small"
      />
      <IconButton
        sx={{ color: '#fefefe', width: 56 }}
        onClick={handleDeleteClick}
      >
        <DeleteIcon />
      </IconButton>
    </Box>
  )
}
