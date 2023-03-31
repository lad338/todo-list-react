import React from 'react'
import { UpperBarWide } from './UpperBarWide'
import { UpperBarSmall } from './UpperBarSmall'
import Box from '@mui/material/Box'

export const UpperBar: React.FC = () => {
  return (
    <Box className="upper-bar-container" sx={{ marginY: 1 }}>
      <UpperBarWide />
      <UpperBarSmall />
    </Box>
  )
}
