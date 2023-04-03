import React, { useMemo } from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import {
  loadTasks,
  setDeleteDialogOpen,
  setSearchQuery,
  useAppDispatch,
} from '../hooks/redux'
import { debounce } from '../utils/input'

export const LowerBarSmall: React.FC = () => {
  const dispatch = useAppDispatch()

  const handleDeleteClick = () => {
    dispatch(setDeleteDialogOpen(true))
  }

  const search = useMemo(() => {
    return debounce(async (q: string) => {
      dispatch(setSearchQuery(q))
      dispatch(loadTasks({ search: q }))
    }, 300)
  }, [dispatch])

  const handleSearch = (e: any) => {
    search(e.target.value)
  }

  return (
    <Box
      width="100%"
      sx={{
        display: { xs: 'flex', md: 'none' },
        flexDirection: 'row',
      }}
    >
      <TextField
        sx={{ flexGrow: 1 }}
        id="filled-basic"
        label="Search.."
        variant="filled"
        size="small"
        onKeyUp={handleSearch}
      />
      <IconButton
        sx={{ color: '#fefefe', width: 48 }}
        onClick={handleDeleteClick}
      >
        <DeleteIcon />
      </IconButton>
    </Box>
  )
}
