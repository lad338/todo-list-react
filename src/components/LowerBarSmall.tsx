import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'

export const LowerBarSmall: React.FC = () => {
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
      />
      <IconButton sx={{ color: '#fefefe', width: 56 }}>
        <DeleteIcon />
      </IconButton>
    </Box>
  )
}
