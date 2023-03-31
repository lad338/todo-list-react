import React from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import SendIcon from '@mui/icons-material/Send'
import IconButton from '@mui/material/IconButton'

export const UpperBarSmall: React.FC = () => {
  return (
    <form>
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
          label="Add Item"
          variant="filled"
        />
        <IconButton sx={{ color: '#fefefe', width: 56 }}>
          <SendIcon />
        </IconButton>
      </Box>
    </form>
  )
}
