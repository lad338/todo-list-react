import React, { useState } from 'react'
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

export const Item: React.FC<Props> = (props) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isEdit, setIsEdit] = useState(false)

  const handleExpandClick = () => {
    setIsExpanded(!isExpanded)
  }

  const handleEditToggle = () => {
    setIsEdit(!isEdit)
  }

  return (
    <ListItem sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <form style={{ width: '100%' }}>
        <Box
          className="item-upper-container"
          sx={{ display: 'flex', flexDirection: 'row', width: '100%' }}
        >
          <ListItemIcon>
            <Checkbox
              edge="start"
              checked={props.isDone}
              tabIndex={-1}
              disableRipple
            />
          </ListItemIcon>
          {!isEdit && (
            <Typography sx={{ marginY: 'auto' }}>{props.title}</Typography>
          )}
          {isEdit && (
            <TextField
              sx={{ marginY: 'auto', height: 50 }}
              fullWidth={true}
              variant="filled"
              placeholder={props.title}
              defaultValue={props.title}
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
                    sx={{ marginX: 2 }}
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
  isDone: boolean
  title: string
}
