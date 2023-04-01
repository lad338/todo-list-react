import React from 'react'
import AppBar from '@mui/material/AppBar'
import Container from '@mui/material/Container'
import { UpperBar } from './UpperBar'
import { LowerBar } from './LowerBar'
import { TitleBarSmall } from './TitleBarSmall'
import { createTheme, ThemeProvider } from '@mui/material'
import { breakpointStyle } from '../styles/breakpoint'
import { appBarInputFieldStyle } from '../styles/textField'

const appBarTheme = createTheme({
  ...breakpointStyle,
  components: {
    ...appBarInputFieldStyle.components,
  },
})

export const AppBarCustomized: React.FC = () => {
  return (
    <ThemeProvider theme={appBarTheme}>
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
    </ThemeProvider>
  )
}
