import React from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

export const TitleBarSmall: React.FC = () => {
  return (
    <Box
      width="100%"
      sx={{
        display: { xs: 'flex', md: 'none' },
      }}
    >
      <Typography textAlign="center" width="100%">
        Marvelous v2.0
      </Typography>
    </Box>
  )
}
