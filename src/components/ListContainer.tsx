import React, { useEffect } from 'react'
import Container from '@mui/material/Container'
import { ListContainerWide } from './ListContainerWide'
import { ListContainerSmall } from './ListContainerSmall'
import { loadItems, useAppDispatch } from '../hooks/redux'

export const ListContainer: React.FC = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(loadItems({}))
  }, [dispatch])

  return (
    <Container className="content-container" maxWidth="xl">
      <ListContainerWide />
      <ListContainerSmall />
    </Container>
  )
}
