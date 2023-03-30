import React from 'react'
import Container from '@mui/material/Container'
import DeleteIcon from '@mui/icons-material/Delete'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

export const TitleBar: React.FC = () => {
  return (
    <Container
      className="title-bar-container"
      style={{ flexDirection: 'row', display: 'flex' }}
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
      >
        Delete all tasks
      </Button>
    </Container>
  )
}
