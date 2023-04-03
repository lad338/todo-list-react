import React from 'react'
import AppBar from '@mui/material/AppBar'
import Container from '@mui/material/Container'
import { UpperBar } from './UpperBar'
import { LowerBar } from './LowerBar'
import { TitleBarSmall } from './TitleBarSmall'
import { createTheme, ThemeProvider } from '@mui/material'
import { breakpointStyle } from '../styles/breakpoint'
import { appBarInputFieldStyle } from '../styles/textField'
import { selectDarkMode, useAppSelector } from '../hooks/redux'
import { appBarButton } from '../styles/appBarButton'

export const AppBarCustomized: React.FC = () => {
  const isDarkMode = useAppSelector(selectDarkMode)
  const appBarTheme = createTheme({
    ...breakpointStyle,
    components: {
      ...appBarInputFieldStyle.components,
      ...appBarButton,
    },
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
    },
  })

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
