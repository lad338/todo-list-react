import React from 'react'
import AppBar from '@mui/material/AppBar'
import Container from '@mui/material/Container'
import { TitleBar } from './TitleBar'
import { SearchBar } from './SearchBar'

export const AppBarCustomized: React.FC = () => {
  return (
    <AppBar position="sticky">
      <Container
        className="app-bar-container"
        style={{ flexDirection: 'column', display: 'flex' }}
      >
        <TitleBar />
        <SearchBar />
      </Container>
    </AppBar>
  )
}
