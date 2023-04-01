import React from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import SendIcon from '@mui/icons-material/Send'
import Button from '@mui/material/Button'
import { useAppDispatch } from '../hooks/redux'
import { addItemAndRefresh } from '../hooks/app'
export const LowerBarWide: React.FC = () => {
  const dispatch = useAppDispatch()
  const handleAddItem = async (event: React.FormEvent<HTMLFormElement>) => {
    await addItemAndRefresh(dispatch, event)
  }

  return (
    <Box
      width="100%"
      sx={{
        display: { xs: 'none', md: 'flex' },
        flexDirection: 'row',
      }}
    >
      <Box
        className="add-item-container"
        style={{ flexDirection: 'row', display: 'flex', flexGrow: 1 }}
      >
        <form onSubmit={handleAddItem}>
          <TextField
            name="new-item-title"
            label="Add item"
            variant="filled"
            sx={{ width: 325 }}
          />
          <Button
            type="submit"
            sx={{
              height: '100%',
              color: '#fefefe',
              marginY: 'auto',
            }}
            variant="outlined"
            endIcon={<SendIcon />}
          >
            Add
          </Button>
        </form>
      </Box>
      <Box>
        <TextField id="filled-basic" label="Search.." variant="filled" />
      </Box>
    </Box>
  )
}
