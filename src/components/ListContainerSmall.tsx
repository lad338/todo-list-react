import React from 'react'
import { useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import AppBar from '@mui/material/AppBar'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import SwipeableViews from 'react-swipeable-views'
import { ListContainerSmallPanel } from './ListContainerSmallPanel'
import { TaskListProps } from './ListContainer'

const a11yProps = (index: number) => {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  }
}
export const ListContainerSmall: React.FC<TaskListProps> = (props) => {
  const theme = useTheme()
  const [value, setValue] = React.useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  const handleChangeIndex = (index: number) => {
    setValue(index)
  }

  return (
    <Box
      sx={{
        marginY: 2,
        display: { xs: 'block', sm: 'none' },
      }}
    >
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="inherit"
          variant="fullWidth"
        >
          <Tab label="To Do" {...a11yProps(0)} />
          <Tab label="Done" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <ListContainerSmallPanel
        value={value}
        index={0}
        dir={theme.direction}
        items={props.todoList}
      />
      <ListContainerSmallPanel
        value={value}
        index={1}
        dir={theme.direction}
        items={props.doneList}
      />
    </Box>
  )
}
