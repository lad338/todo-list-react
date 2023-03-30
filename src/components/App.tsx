import React from 'react'
import Container from '@mui/material/Container'
import { AppBarCustomized } from './AppBarCustomized'
import { createTheme, ThemeProvider } from '@mui/material'

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 450,
      md: 700,
      lg: 1450,
      xl: 1800,
    },
  },
})
function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <AppBarCustomized />
        <Container></Container>
      </div>
    </ThemeProvider>
  )
}

export default App
