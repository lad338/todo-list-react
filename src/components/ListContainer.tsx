import React from 'react'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import List from '@mui/material/List'

import ListSubheader from '@mui/material/ListSubheader'
import Typography from '@mui/material/Typography'
import { Divider } from '@mui/material'
import { Item } from './Item'

export const ListContainer: React.FC = () => {
  return (
    <Container className="content-container">
      <Box
        className="item-container"
        sx={{ marginY: 2, display: 'flex', flexDirection: 'row' }}
      >
        <Box
          className="undone-list-container"
          sx={{ width: '48%', marginRight: '4%' }}
        >
          <List
            sx={{ width: '100%', bgcolor: 'background.paper' }}
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                <Typography variant="h4">To Do</Typography>
                <Divider />
              </ListSubheader>
            }
          >
            <Item title={'Lorem Ipsum'} isDone={false} />
            <Item title={'Lorem Ipsum 2'} isDone={false} />
          </List>
        </Box>
        <Box className="done-list-container" sx={{ width: '48%' }}>
          <List
            sx={{ width: '100%', bgcolor: 'background.paper' }}
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                <Typography variant="h4">Done</Typography>
                <Divider />
              </ListSubheader>
            }
          ></List>
        </Box>
      </Box>
    </Container>
  )
}
