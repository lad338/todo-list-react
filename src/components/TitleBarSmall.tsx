import React from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { DarkModeButton } from './DarkModeButton'
import { OnlineIcon } from './OnlineIcon'

export const TitleBarSmall: React.FC = () => {
  return (
    <Box
      width="100%"
      sx={{
        display: { xs: 'flex', md: 'none' },
      }}
    >
      <Box sx={{ margin: 'auto', display: 'flex', flexDirection: 'row' }}>
        {/*<OnlineIcon />*/}
        <Typography sx={{ margin: 'auto' }} textAlign="center">
          TODO LIST
        </Typography>
        <DarkModeButton />
      </Box>
    </Box>
  )
}
