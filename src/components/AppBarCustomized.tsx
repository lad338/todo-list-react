import React from 'react'
import AppBar from '@mui/material/AppBar'
import Container from '@mui/material/Container'
import { UpperBar } from './UpperBar'
import { LowerBar } from './LowerBar'

export const AppBarCustomized: React.FC = () => {
  return (
    <AppBar>
      <Container
        className="app-bar-container"
        sx={{ flexDirection: 'column', display: 'flex' }}
        maxWidth="xl"
      >
        <UpperBar />
        <LowerBar />
      </Container>
    </AppBar>
  )
}
