import Box from '@mui/material/Box'
import React from 'react'
import { TaskList } from './TaskList'
import TaskItem from '../models/TaskItem'

export const ListContainerSmallPanel: React.FC<Props> = (props) => {
  const { value, index } = props

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
    >
      {value === index && (
        <Box sx={{ paddingTop: 1 }}>
          <TaskList headerType={'none'} items={props.items} />
        </Box>
      )}
    </Box>
  )
}

type Props = {
  items: TaskItem[]
  dir?: string
  index: number
  value: number
}
