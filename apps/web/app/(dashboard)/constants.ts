import { FaList, FaColumns, FaUser, FaCog } from 'react-icons/fa'

export const SIDEBAR_ITEMS = [
  {
    title: 'Tasks List',
    url: '/tasks-list',
    icon: FaList,
  },
  {
    title: 'Kanban Board',
    url: '/kanban-board',
    icon: FaColumns,
  },
  {
    title: 'My Tasks',
    url: '/my-tasks',
    icon: FaUser,
  },
  {
    title: 'Settings',
    url: '#',
    icon: FaCog,
  },
]
