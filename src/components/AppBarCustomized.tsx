import React from 'react'
import AppBar from '@mui/material/AppBar'
import Container from '@mui/material/Container'
import { UpperBar } from './UpperBar'
import { LowerBar } from './LowerBar'
import { TitleBarSmall } from './TitleBarSmall'

export const AppBarCustomized: React.FC = () => {
  return (
    <AppBar sx={{ position: 'sticky' }}>
      <Container
        className="app-bar-container"
        sx={{ flexDirection: 'column', display: 'flex' }}
        maxWidth="xl"
      >
        <TitleBarSmall />
        <UpperBar />
        <LowerBar />
      </Container>
    </AppBar>
  )
}
