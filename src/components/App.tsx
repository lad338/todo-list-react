import React from 'react'
import { AppBarCustomized } from './AppBarCustomized'
import { createTheme, ThemeProvider } from '@mui/material'
import { ListContainer } from './ListContainer'
import { DeleteAllDialog } from './DeleteAllDialog'

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 450,
      md: 700,
      lg: 1450,
      xl: 1650,
    },
  },
})
const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <DeleteAllDialog />
        <AppBarCustomized />
        <ListContainer />
      </div>
    </ThemeProvider>
  )
}

export default App
