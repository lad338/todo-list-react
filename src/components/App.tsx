import React from 'react'
import { AppBarCustomized } from './AppBarCustomized'
import { createTheme, ThemeProvider } from '@mui/material'
import { ListContainer } from './ListContainer'
import { DeleteAllDialog } from './DeleteAllDialog'
import CssBaseline from '@mui/material/CssBaseline'
import { breakpointStyle } from '../styles/breakpoint'

const theme = createTheme({
  ...breakpointStyle,
})
const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <DeleteAllDialog />
        <AppBarCustomized />
        <ListContainer />
      </div>
    </ThemeProvider>
  )
}

export default App
