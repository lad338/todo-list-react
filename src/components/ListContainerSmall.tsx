import React from 'react'
import { useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import { ListContainerSmallPanel } from './ListContainerSmallPanel'
import { selectDoneList, selectTodoList, useAppSelector } from '../hooks/redux'

const a11yProps = (index: number) => {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  }
}
export const ListContainerSmall: React.FC = () => {
  const theme = useTheme()
  const [value, setValue] = React.useState(0)
  const todoList = useAppSelector(selectTodoList)
  const doneList = useAppSelector(selectDoneList)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
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
        items={todoList}
      />
      <ListContainerSmallPanel
        value={value}
        index={1}
        dir={theme.direction}
        items={doneList}
      />
    </Box>
  )
}
