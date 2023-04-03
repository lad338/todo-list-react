import React, { FormEvent, useRef, useState } from 'react'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import Checkbox from '@mui/material/Checkbox'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import TaskItem from '../models/TaskItem'
import {
  loadTasks,
  selectOnline,
  selectSearchQuery,
  useAppDispatch,
  useAppSelector,
} from '../hooks/redux'
import repository from '../utils/repository'
import { TaskItemActions } from './TaskItemActions'
import { useSnackbar } from 'notistack'
import { trimTask } from '../utils/taskTItle'

export const Task: React.FC<Props> = (props) => {
  const dispatch = useAppDispatch()
  const search = useAppSelector(selectSearchQuery)
  const isOnline = useAppSelector(selectOnline)
  const repo = repository(isOnline)
  const { enqueueSnackbar } = useSnackbar()

  const [isEdit, setIsEdit] = useState(false)
  const [isDelete, setIsDelete] = useState(false)
  const updateTextField = useRef<HTMLInputElement>(null)

  const handleEditToggle = () => {
    const currentEdit = isEdit
    setIsEdit(!isEdit)
    if (!currentEdit) {
      //Have to set time out for focus
      setTimeout(() => {
        updateTextField.current?.focus()
      }, 100)
    }
  }

  const handleDeleteToggle = () => {
    setIsDelete(!isDelete)
  }

  const handleDoneTask = async () => {
    try {
      await repo.doneTask(props.task.id, !props.task.isDone)
      dispatch(loadTasks({ search }))
      enqueueSnackbar(
        `${!props.task.isDone ? 'Done' : 'Undone'} task ${trimTask(
          props.task.title,
          30
        )}`
      )
    } catch (e) {
      enqueueSnackbar('Failed to update status of task', { variant: 'warning' })
    }
  }

  const handleUpdateTaskTitle = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const title = (formData.get('update-title') || '').toString().trim()
    if (title !== '') {
      if (title !== props.task.title) {
        try {
          await repo.updateTaskTitle(props.task.id, title)
          dispatch(loadTasks({ search }))
          enqueueSnackbar(`Successfully updated task to ${trimTask(title, 30)}`)
        } catch (e) {
          enqueueSnackbar(`Failed to update task`)
        }
      }
      handleEditToggle()
    }
  }

  const handleDeleteTask = async () => {
    try {
      await repo.deleteOne(props.task.id)
      dispatch(loadTasks({ search }))
      enqueueSnackbar(
        `Successfully deleted task ${trimTask(props.task.title, 30)}`
      )
    } catch (e) {
      enqueueSnackbar(`Failed to delete task`)
    }
  }

  return (
    <ListItem sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <form style={{ width: '100%' }} onSubmit={handleUpdateTaskTitle}>
        <Box
          className="task-container"
          sx={{ display: 'flex', flexDirection: 'row', width: '100%' }}
        >
          <ListItemIcon sx={{ marginRight: -2 }}>
            <Checkbox
              sx={{ height: 40 }}
              edge="start"
              checked={props.task.isDone}
              tabIndex={-1}
              onClick={handleDoneTask}
            />
          </ListItemIcon>
          {!isEdit && (
            <Typography
              sx={{
                marginY: 'auto',
                overflowWrap: 'break-word',
                flexGrow: 1,
                overflowX: 'scroll',
              }}
            >
              {props.task.title}
            </Typography>
          )}
          {isEdit && (
            <TextField
              name="update-title"
              sx={{
                marginY: 'auto',
                '& .MuiInputBase-root': {
                  height: 40, // change the height here
                },
              }}
              fullWidth={true}
              variant="filled"
              placeholder={props.task.title}
              defaultValue={props.task.title}
              inputRef={updateTextField}
            />
          )}

          {!isEdit && !isDelete && (
            <Box
              className="task-actions-container"
              sx={{
                ml: 1,
                right: 0,
                maxHeight: 40,
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              <IconButton aria-label="edit" onClick={handleEditToggle}>
                <EditIcon />
              </IconButton>
              <IconButton aria-label="delete" onClick={handleDeleteToggle}>
                <DeleteIcon />
              </IconButton>
            </Box>
          )}

          {isEdit && (
            <TaskItemActions isSubmit={true} handleCancel={handleEditToggle} />
          )}

          {isDelete && (
            <TaskItemActions
              isSubmit={false}
              handleCancel={handleDeleteToggle}
              handleClick={handleDeleteTask}
            />
          )}
        </Box>
      </form>
    </ListItem>
  )
}

type Props = {
  task: TaskItem
}
