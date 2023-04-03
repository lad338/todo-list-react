import React, { useMemo, useRef } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import AddIcon from '@mui/icons-material/Add'
import Button from '@mui/material/Button'
import {
  loadTasks,
  selectOnline,
  setSearchQuery,
  useAppDispatch,
  useAppSelector,
} from '../hooks/redux'
import { addTaskAndRefresh } from '../hooks/app'
import { debounce } from '../utils/input'
import { useSnackbar } from 'notistack'
export const LowerBarWide: React.FC = () => {
  const dispatch = useAppDispatch()
  const isOnline = useAppSelector(selectOnline)
  const formRef = useRef<HTMLFormElement>(null)
  const { enqueueSnackbar } = useSnackbar()
  const handleAddTask = async (event: React.FormEvent<HTMLFormElement>) => {
    await addTaskAndRefresh(dispatch, isOnline, formRef, event, enqueueSnackbar)
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
        display: { xs: 'none', md: 'flex' },
        flexDirection: 'row',
      }}
    >
      <Box
        className="add-task-container"
        style={{ flexDirection: 'row', display: 'flex', flexGrow: 1 }}
      >
        <form onSubmit={handleAddTask} ref={formRef}>
          <TextField
            name="new-task-title"
            label="Add task"
            variant="filled"
            sx={{ width: 333 }}
          />
          <Button
            type="submit"
            sx={{
              textTransform: 'none',
              height: '100%',
              color: '#fefefe',
              marginY: 'auto',
            }}
            variant="outlined"
            endIcon={<AddIcon />}
          >
            Add
          </Button>
        </form>
      </Box>
      <Box>
        <TextField
          sx={{ width: 195 }}
          label="Search.."
          variant="filled"
          onKeyUp={handleSearch}
        />
      </Box>
    </Box>
  )
}
