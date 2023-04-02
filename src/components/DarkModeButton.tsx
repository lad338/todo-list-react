import IconButton from '@mui/material/IconButton'
import React from 'react'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import {
  selectDarkMode,
  setDarkMode,
  useAppDispatch,
  useAppSelector,
} from '../hooks/redux'

export const DarkModeButton: React.FC = () => {
  const dispatch = useAppDispatch()
  const isDarkMode = useAppSelector(selectDarkMode)

  const toggleColorMode = () => {
    dispatch(setDarkMode(!isDarkMode))
  }

  return (
    <IconButton sx={{ mx: 1 }} onClick={toggleColorMode} color="inherit">
      {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  )
}
