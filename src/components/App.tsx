import React, { useEffect } from 'react'
import { AppBarCustomized } from './AppBarCustomized'
import { createTheme, ThemeProvider, useMediaQuery } from '@mui/material'
import { ListContainer } from './ListContainer'
import { DeleteAllDialog } from './DeleteAllDialog'
import CssBaseline from '@mui/material/CssBaseline'
import { breakpointStyle } from '../styles/breakpoint'
import {
  selectDarkMode,
  setDarkMode,
  useAppDispatch,
  useAppSelector,
} from '../hooks/redux'
import { SnackbarProvider } from 'notistack'
const App: React.FC = () => {
  const dispatch = useAppDispatch()
  const isDarkMode = useAppSelector(selectDarkMode)
  const isUserDarkModePreferred = useMediaQuery('(prefers-color-scheme: dark)')

  useEffect(() => {
    if (isUserDarkModePreferred) {
      dispatch(setDarkMode(true))
    } else {
      dispatch(setDarkMode(false))
    }
  }, [dispatch, isUserDarkModePreferred])

  const theme = createTheme({
    ...breakpointStyle,
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
    },
  })

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider maxSnack={3}>
        <div className="App">
          <DeleteAllDialog />
          <AppBarCustomized />
          <ListContainer />
        </div>
      </SnackbarProvider>
    </ThemeProvider>
  )
}

export default App
