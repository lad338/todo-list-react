import React from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import SendIcon from '@mui/icons-material/Send'
import Button from '@mui/material/Button'
export const LowerBarWide: React.FC = () => {
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
        <form>
          <TextField
            id="filled-basic"
            label="Add item"
            variant="filled"
            sx={{ width: 325 }}
          />
          <Button
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
