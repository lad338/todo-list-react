import React from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import SendIcon from '@mui/icons-material/Send'
import IconButton from '@mui/material/IconButton'
import { useAppDispatch } from '../hooks/redux'
import { addItemAndRefresh } from '../hooks/app'
import { inputFieldStyle } from '../styles/textField'

export const UpperBarSmall: React.FC = () => {
  const dispatch = useAppDispatch()
  const handleAddItem = async (event: React.FormEvent<HTMLFormElement>) => {
    await addItemAndRefresh(dispatch, event)
  }

  return (
    <form onSubmit={handleAddItem}>
      <Box
        width="100%"
        sx={{
          display: { xs: 'flex', md: 'none' },
          flexDirection: 'row',
        }}
      >
        <TextField
          sx={{ flexGrow: 1 }}
          name="new-item-title"
          label="Add Item"
          variant="filled"
          size="small"
          InputProps={inputFieldStyle}
          InputLabelProps={inputFieldStyle}
        />
        <IconButton sx={{ color: '#fefefe', width: 48 }} type="submit">
          <SendIcon />
        </IconButton>
      </Box>
    </form>
  )
}
