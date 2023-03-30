import React from 'react'
import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField'
import SendIcon from '@mui/icons-material/Send'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'

export const SearchBar: React.FC = () => {
  return (
    <Container
      className="search-bar-container"
      style={{ flexDirection: 'row', display: 'flex' }}
    >
      <Box
        className="add-item-container"
        style={{ flexDirection: 'row', display: 'flex', flexGrow: 1 }}
      >
        <form>
          <TextField id="filled-basic" label="Add item" variant="filled" />
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
      <TextField id="filled-basic" label="Search.." variant="filled" />
    </Container>
  )
}
