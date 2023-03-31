import React from 'react'
import Box from '@mui/material/Box'
import { TaskList } from './TaskList'
import { TaskListProps } from './ListContainer'

export const ListContainerWide: React.FC<TaskListProps> = (props) => {
  return (
    <Box
      className="list-container-wide"
      sx={{
        marginY: 2,
        display: { xs: 'none', sm: 'flex' },
        flexDirection: 'row',
      }}
    >
      <Box
        className="undone-list-container"
        sx={{ width: '49.5%', marginRight: '1%' }}
      >
        <TaskList headerType={'todo'} items={props.todoList} />
      </Box>
      <Box className="done-list-container" sx={{ width: '49.5%' }}>
        <TaskList headerType={'done'} items={props.doneList} />
      </Box>
    </Box>
  )
}
