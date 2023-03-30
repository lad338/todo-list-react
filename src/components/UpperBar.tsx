import React from 'react'
import Container from '@mui/material/Container'
import { UpperBarWide } from './UpperBarWide'
import { UpperBarSmall } from './UpperBarSmall'

export const UpperBar: React.FC = () => {
  return (
    <Container className="upper-bar-container" sx={{ marginY: 1 }}>
      <UpperBarWide />
      <UpperBarSmall />
    </Container>
  )
}
