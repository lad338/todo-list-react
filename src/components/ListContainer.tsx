import React from 'react'
import Container from '@mui/material/Container'
import { ListContainerWide } from './ListContainerWide'
import { ListContainerSmall } from './ListContainerSmall'
import TaskItem from '../models/TaskItem'

export const ListContainer: React.FC = () => {
  const items: TaskListProps = {
    todoList: [
      {
        id: '1',
        title: 'Lorem Ipsum',
        isDone: false,
      },
      {
        id: '2',
        title: 'Lorem Ipsum 2',
        isDone: false,
      },
    ],
    doneList: [
      {
        id: '3',
        title: 'Lorem Ipsum',
        isDone: true,
      },
    ],
  }

  return (
    <Container className="content-container" maxWidth="xl">
      <ListContainerWide todoList={items.todoList} doneList={items.doneList} />
      <ListContainerSmall todoList={items.todoList} doneList={items.doneList} />
    </Container>
  )
}

export type TaskListProps = {
  todoList: TaskItem[]
  doneList: TaskItem[]
}
