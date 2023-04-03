import React from 'react'
import TaskItem from '../models/TaskItem'
import ListSubheader from '@mui/material/ListSubheader'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import { Task } from './Task'

export const TaskList: React.FC<Props> = (props) => {
  return (
    <List
      sx={{ width: '100%', bgcolor: 'background.paper' }}
      subheader={
        <ListSubheader component="div">
          {props.headerType === 'todo' && (
            <>
              <Typography variant="h4">To Do</Typography>
              <Divider />
            </>
          )}
          {props.headerType === 'done' && (
            <>
              <Typography variant="h4">Done</Typography>
              <Divider />
            </>
          )}
        </ListSubheader>
      }
    >
      {props.tasks.map((task) => {
        return <Task task={task} key={'task-item-' + task.id} />
      })}
    </List>
  )
}

type Props = {
  headerType: 'todo' | 'done' | 'none'
  tasks: TaskItem[]
}
