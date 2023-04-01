import React, { useEffect } from 'react'
import Container from '@mui/material/Container'
import { ListContainerWide } from './ListContainerWide'
import { ListContainerSmall } from './ListContainerSmall'
import {
  initItems,
  loadItems,
  selectHasMore,
  selectSearchQuery,
  selectSkip,
  setSearchQuery,
  setSkip,
  useAppDispatch,
  useAppSelector,
} from '../hooks/redux'

export const ListContainer: React.FC = () => {
  const dispatch = useAppDispatch()
  const hasMore = useAppSelector(selectHasMore)
  const skip = useAppSelector(selectSkip)
  const search = useAppSelector(selectSearchQuery)

  useEffect(() => {
    dispatch(initItems())
    dispatch(setSearchQuery(''))
    dispatch(setSkip(0))
  }, [dispatch])

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        (document.documentElement && document.documentElement.scrollTop) ||
        document.body.scrollTop
      const scrollHeight =
        (document.documentElement && document.documentElement.scrollHeight) ||
        document.body.scrollHeight
      const clientHeight =
        document.documentElement.clientHeight || window.innerHeight
      const scrolledToBottom =
        Math.ceil(scrollTop + clientHeight) >= scrollHeight
      if (scrolledToBottom && hasMore) {
        dispatch(loadItems({ search, skip: skip + 15 }))
        dispatch(setSkip(15 + skip))
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [dispatch, hasMore, skip, search])

  return (
    <Container className="content-container" maxWidth="xl">
      <ListContainerWide />
      <ListContainerSmall />
    </Container>
  )
}
