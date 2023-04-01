import React, { useMemo } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import SendIcon from '@mui/icons-material/Send'
import Button from '@mui/material/Button'
import { loadItems, setSearchQuery, useAppDispatch } from '../hooks/redux'
import { addItemAndRefresh } from '../hooks/app'
import { debounce } from '../utils/input'
import { inputFieldStyle } from '../styles/textField'
export const LowerBarWide: React.FC = () => {
  const dispatch = useAppDispatch()
  const handleAddItem = async (event: React.FormEvent<HTMLFormElement>) => {
    await addItemAndRefresh(dispatch, event)
  }

  const search = useMemo(() => {
    return debounce(async (q: string) => {
      dispatch(setSearchQuery(q))
      dispatch(loadItems({ search: q }))
    }, 300)
  }, [dispatch])

  const handleSearch = (e: any) => {
    search(e.target.value)
  }

  return (
    <Box
      width="100%"
      sx={{
        display: { xs: 'none', md: 'flex' },
        flexDirection: 'row',
      }}
    >
      <Box
        className="add-item-container"
        style={{ flexDirection: 'row', display: 'flex', flexGrow: 1 }}
      >
        <form onSubmit={handleAddItem}>
          <TextField
            name="new-item-title"
            label="Add item"
            variant="filled"
            sx={{ width: 325 }}
            InputProps={inputFieldStyle}
            InputLabelProps={inputFieldStyle}
          />
          <Button
            type="submit"
            sx={{
              height: '100%',
              color: '#fefefe',
              marginY: 'auto',
            }}
            variant="outlined"
            endIcon={<SendIcon />}
          >
            Add
          </Button>
        </form>
      </Box>
      <Box>
        <TextField
          label="Search.."
          variant="filled"
          onKeyUp={handleSearch}
          InputProps={inputFieldStyle}
          InputLabelProps={inputFieldStyle}
        />
      </Box>
    </Box>
  )
}
