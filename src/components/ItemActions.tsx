import React from 'react'
import Box from '@mui/material/Box'
import DoneIcon from '@mui/icons-material/Done'
import IconButton from '@mui/material/IconButton'
import ClearIcon from '@mui/icons-material/Clear'

export const ItemActions: React.FC<Props> = (props) => {
  return (
    <Box
      className="item-confirm-actions-container"
      sx={{ display: 'flex', flexDirection: 'row', maxHeight: 40, ml: 1 }}
    >
      <IconButton
        aria-label="confirm"
        type={props.isSubmit ? 'submit' : 'button'}
        onClick={props.handleClick}
      >
        <DoneIcon />
      </IconButton>
      <IconButton
        aria-label="cancel"
        onClick={props.handleCancel}
        sx={{ marginLeft: 0 }}
      >
        <ClearIcon />
      </IconButton>
    </Box>
  )
}

type Props = {
  isSubmit: boolean
  handleClick?: () => void
  handleCancel: () => void
}
