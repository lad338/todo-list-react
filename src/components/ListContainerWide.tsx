import React from 'react'
import Box from '@mui/material/Box'
import { TaskList } from './TaskList'
import { selectDoneList, selectTodoList, useAppSelector } from '../hooks/redux'

export const ListContainerWide: React.FC = () => {
  const todoList = useAppSelector(selectTodoList)
  const doneList = useAppSelector(selectDoneList)

  return (
    <Box
      className="list-container-wide"
      sx={{
        marginY: 2,
        display: { xs: 'none', md: 'flex' },
        flexDirection: 'row',
      }}
    >
      <Box
        className="undone-list-container"
        sx={{ width: '49.5%', marginRight: '1%' }}
      >
        <TaskList headerType={'todo'} tasks={todoList} />
      </Box>
      <Box className="done-list-container" sx={{ width: '49.5%' }}>
        <TaskList headerType={'done'} tasks={doneList} />
      </Box>
    </Box>
  )
}
