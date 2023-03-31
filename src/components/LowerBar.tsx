import React from 'react'
import { LowerBarWide } from './LowerBarWide'
import { LowerBarSmall } from './LowerBarSmall'
import Box from '@mui/material/Box'

export const LowerBar: React.FC = () => {
  return (
    <Box className="lower-bar-container" sx={{ marginBottom: 1 }}>
      <LowerBarWide />
      <LowerBarSmall />
    </Box>
  )
}
