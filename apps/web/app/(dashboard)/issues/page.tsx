import React from 'react'
import TaskClient from './task-client'
import { Issue } from '../types'

const getIssues = async (): Promise<Issue[]> => {
  return [
    {
      id: 'PROJ-1',
      summary: 'Fix login bug',
      type: 'Bug',
      status: 'In Progress',
      priority: 'High',
      assignee: 'Alice',
    },
    {
      id: 'PROJ-2',
      summary: 'Implement new feature',
      type: 'Story',
      status: 'To Do',
      priority: 'Medium',
      assignee: 'Bob',
    },
    {
      id: 'PROJ-3',
      summary: 'Update documentation',
      type: 'Task',
      status: 'Done',
      priority: 'Low',
      assignee: 'Charlie',
    },
    {
      id: 'PROJ-4',
      summary: 'Refactor codebase',
      type: 'Task',
      status: 'In Progress',
      priority: 'Medium',
      assignee: 'David',
    },
    {
      id: 'PROJ-5',
      summary: 'Investigate performance issue',
      type: 'Bug',
      status: 'To Do',
      priority: 'High',
      assignee: 'Eve',
    },
  ]
}

const TasksList = async () => {
  const issues = await getIssues()

  return (
    <div className="w-full bg-background">
      <div className=" flex-1 w-full p-2 md:p-3 lg:p-4 m-3">
        <TaskClient initialIssues={issues} />
      </div>
    </div>
  )
}

export default TasksList
