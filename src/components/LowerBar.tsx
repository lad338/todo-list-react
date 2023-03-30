import React from 'react'
import Container from '@mui/material/Container'
import { LowerBarWide } from './LowerBarWide'
import { LowerBarSmall } from './LowerBarSmall'

export const LowerBar: React.FC = () => {
  return (
    <Container className="lower-bar-container" sx={{ marginBottom: 1 }}>
      <LowerBarWide />
      <LowerBarSmall />
    </Container>
  )
}
