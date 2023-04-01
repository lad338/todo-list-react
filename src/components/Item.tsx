import React, { useRef, useState } from 'react'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import Checkbox from '@mui/material/Checkbox'
import ItemExpandMoreIcon from './ItemExpandMoreIcon'
import Collapse from '@mui/material/Collapse'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import DoneIcon from '@mui/icons-material/Done'
import ClearIcon from '@mui/icons-material/Clear'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import TaskItem from '../models/TaskItem'
import { loadItems, useAppDispatch } from '../hooks/redux'
import { doneItem } from '../hooks/api'

export const Item: React.FC<Props> = (props) => {
  const dispatch = useAppDispatch()

  const [isExpanded, setIsExpanded] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const updateTextField = useRef<HTMLInputElement>(null)

  const handleExpandClick = () => {
    setIsExpanded(!isExpanded)
  }

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

  const handleDoneItem = async (id: string, isDone: boolean) => {
    await doneItem(id, isDone)
    dispatch(loadItems({}))
  }

  return (
    <ListItem sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <form style={{ width: '100%' }}>
        <Box
          className="item-upper-container"
          sx={{ display: 'flex', flexDirection: 'row', width: '100%' }}
        >
          <ListItemIcon sx={{ marginRight: -2 }}>
            <Checkbox
              edge="start"
              checked={props.item.isDone}
              tabIndex={-1}
              onClick={async () => {
                await handleDoneItem(props.item.id, !props.item.isDone)
              }}
            />
          </ListItemIcon>
          {!isEdit && (
            <Typography sx={{ marginY: 'auto' }}>{props.item.title}</Typography>
          )}
          {isEdit && (
            <TextField
              sx={{ marginY: 'auto' }}
              fullWidth={true}
              variant="filled"
              size="small"
              placeholder={props.item.title}
              defaultValue={props.item.title}
              inputRef={updateTextField}
            />
          )}

          <ItemExpandMoreIcon expand={isExpanded} onClick={handleExpandClick} />
        </Box>

        <Collapse
          sx={{ width: '100%', marginY: 1 }}
          in={isExpanded}
          timeout="auto"
          unmountOnExit
        >
          <Box
            className="item-extra-actions-container"
            sx={{ display: 'flex', flexDirection: 'row' }}
          >
            <Box
              className="item-edit-actions-container"
              sx={{ display: 'flex', flexDirection: 'row', flexGrow: 1 }}
            >
              {!isEdit && (
                <>
                  <IconButton
                    aria-label="edit"
                    edge="start"
                    onClick={handleEditToggle}
                  >
                    <EditIcon />
                  </IconButton>
                </>
              )}
              {isEdit && (
                <>
                  <IconButton aria-label="confirm" edge="start" type="submit">
                    <DoneIcon />
                  </IconButton>
                  <IconButton
                    aria-label="cancel"
                    edge="start"
                    onClick={handleEditToggle}
                    sx={{ marginLeft: 0 }}
                  >
                    <ClearIcon />
                  </IconButton>
                </>
              )}
            </Box>
            <IconButton aria-label="delete" edge="end">
              <DeleteIcon />
            </IconButton>
          </Box>
        </Collapse>
      </form>
    </ListItem>
  )
}

type Props = {
  item: TaskItem
}
