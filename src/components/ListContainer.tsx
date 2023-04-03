import React, { useEffect } from 'react'
import Container from '@mui/material/Container'
import { ListContainerWide } from './ListContainerWide'
import { ListContainerSmall } from './ListContainerSmall'
import {
  initTasks,
  loadMoreTasks,
  selectHasMore,
  selectSearchQuery,
  selectSkip,
  setOnline,
  setSkip,
  useAppDispatch,
  useAppSelector,
} from '../hooks/redux'
import { checkOnline } from '../hooks/app'
import { useSnackbar } from 'notistack'

export const ListContainer: React.FC = () => {
  const dispatch = useAppDispatch()
  const { enqueueSnackbar } = useSnackbar()
  const hasMore = useAppSelector(selectHasMore)
  const skip = useAppSelector(selectSkip)
  const search = useAppSelector(selectSearchQuery)

  useEffect(() => {
    checkOnline().then((isBackendAvailable) => {
      if (!isBackendAvailable) {
        enqueueSnackbar('Backend unavailable. Using offline mode', {
          variant: 'error',
        })
      }
      dispatch(setOnline(isBackendAvailable))
      dispatch(initTasks())
    })
  }, [dispatch, enqueueSnackbar])

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
        dispatch(loadMoreTasks({ search, skip: skip + 15 }))
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
