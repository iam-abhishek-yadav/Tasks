export type Issue = {
  id: string
  summary: string
  type: 'Bug' | 'Task' | 'Story'
  status: 'To Do' | 'In Progress' | 'Done'
  priority: 'Low' | 'Medium' | 'High'
  assignee: string
}
