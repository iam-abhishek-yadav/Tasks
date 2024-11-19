'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import SortableHeader from './sortable-header'
import { Issue } from '../types'
import { getBadgeColor } from '../utils'
import NoIssuesFound from './no-issues-found'

export default function JiraIssuesClient({
  initialIssues = [],
}: {
  initialIssues?: Issue[]
}) {
  const [issues, setIssues] = useState<Issue[]>(initialIssues)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<Issue['status'] | 'All'>(
    'All'
  )
  const [userFilter, setUserFilter] = useState<string | 'All'>('All')
  const [sortField, setSortField] = useState<keyof Issue>('id')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const users = Array.from(
    new Set(initialIssues.map((issues) => issues.assignee))
  )

  const filteredIssues = issues
    .filter((issue) =>
      issue.summary.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((issue) =>
      statusFilter === 'All' ? true : issue.status === statusFilter
    )
    .filter((issue) =>
      userFilter === 'All' ? true : issue.assignee === userFilter
    )
    .sort((a, b) => {
      if (a[sortField] < b[sortField]) return sortDirection === 'asc' ? -1 : 1
      if (a[sortField] > b[sortField]) return sortDirection === 'asc' ? 1 : -1
      return 0
    })

  const handleSort = (field: keyof Issue) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  return (
    <div className="w-full">
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Issues</h2>
        <p className="text-gray-600">Manage and track your project issues</p>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <Input
          placeholder="Search issues..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="sm:max-w-xs"
        />
        <Select
          value={statusFilter}
          onValueChange={(value) =>
            setStatusFilter(value as Issue['status'] | 'All')
          }
        >
          <SelectTrigger className="sm:w-[130px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Status</SelectItem>
            <SelectItem value="To Do">To Do</SelectItem>
            <SelectItem value="In Progress">In Progress</SelectItem>
            <SelectItem value="Done">Done</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={userFilter}
          onValueChange={(value) => setUserFilter(value as string | 'All')}
        >
          <SelectTrigger className="sm:w-[130px]">
            <SelectValue placeholder="Filter by assignee" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Users</SelectItem>
            {users.map((user) => (
              <SelectItem key={user} value={user}>
                {user}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="overflow-x-auto min-w-[600px] xl:min-w-[800px] 2xl:min-w-[1200px]">
        <Table className="border border-gray-300 border-collapse rounded-lg">
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="border-r border-gray-300 w-[100px]">
                <SortableHeader
                  label="ID"
                  field="id"
                  sortField={sortField}
                  sortDirection={sortDirection}
                  onSort={handleSort}
                />
              </TableHead>
              <TableHead className="border-r border-gray-300 max-w-[200px] truncate">
                <SortableHeader
                  label="Summary"
                  field="summary"
                  sortField={sortField}
                  sortDirection={sortDirection}
                  onSort={handleSort}
                />
              </TableHead>
              <TableHead className="border-r border-gray-300 w-[100px]">
                Type
              </TableHead>
              <TableHead className="border-r border-gray-300 w-[100px]">
                <SortableHeader
                  label="Status"
                  field="status"
                  sortField={sortField}
                  sortDirection={sortDirection}
                  onSort={handleSort}
                />
              </TableHead>
              <TableHead className="border-r border-gray-300 w-[150px]">
                <SortableHeader
                  label="Priority"
                  field="priority"
                  sortField={sortField}
                  sortDirection={sortDirection}
                  onSort={handleSort}
                />
              </TableHead>
              <TableHead className="hover:bg-transparent w-[200px]">
                <SortableHeader
                  label="Assignee"
                  field="assignee"
                  sortField={sortField}
                  sortDirection={sortDirection}
                  onSort={handleSort}
                />
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filteredIssues.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center border-t border-gray-300"
                >
                  <NoIssuesFound />
                </TableCell>
              </TableRow>
            ) : (
              filteredIssues.map((issue) => (
                <TableRow key={issue.id} className="border-t border-gray-300">
                  <TableCell className="font-medium border-r border-gray-300">
                    {issue.id}
                  </TableCell>
                  <TableCell className="max-w-[200px] truncate border-r border-gray-300">
                    {issue.summary}
                  </TableCell>
                  <TableCell className="border-r border-gray-300">
                    <Badge
                      variant="secondary"
                      className={getBadgeColor(issue.type, 'type')}
                    >
                      {issue.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="border-r border-gray-300 truncate">
                    <Badge
                      variant="secondary"
                      className={getBadgeColor(issue.status, 'status')}
                    >
                      {issue.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="border-r border-gray-300">
                    <Badge
                      variant="secondary"
                      className={getBadgeColor(issue.priority, 'priority')}
                    >
                      {issue.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>{issue.assignee}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
