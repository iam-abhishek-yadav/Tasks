'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'

export default function AddTask() {
  const [data, setData] = useState({
    title: '',
    description: '',
    assignee: '',
    priority: '',
    dueDate: new Date(),
  })

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    console.log('Form submitted')
  }

  return (
    <div className="w-full mx-auto p-1">
      <h2 className="text-2xl font-bold mb-6">Create issue</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="type" className="text-sm font-medium text-gray-700">
            Task Type
          </Label>
          <Select>
            <SelectTrigger className="w-full mt-1">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="story">Story</SelectItem>
              <SelectItem value="bug">Bug</SelectItem>
              <SelectItem value="task">Task</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="title" className="text-sm font-medium text-gray-700">
            Summary
          </Label>
          <Input
            id="title"
            placeholder="Enter task title"
            className="mt-1"
            required
          />
        </div>

        <div>
          <Label
            htmlFor="description"
            className="text-sm font-medium text-gray-700"
          >
            Description
          </Label>
          <Textarea
            id="description"
            placeholder="Enter task description"
            className="mt-1"
            rows={4}
          />
        </div>

        <div>
          <Label
            htmlFor="assignee"
            className="text-sm font-medium text-gray-700"
          >
            Assignee
          </Label>
          <Select>
            <SelectTrigger className="w-full mt-1">
              <SelectValue placeholder="Select assignee" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="john">John Doe</SelectItem>
              <SelectItem value="jane">Jane Smith</SelectItem>
              <SelectItem value="bob">Bob Johnson</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="text-sm font-medium text-gray-700">Priority</Label>
          <Select>
            <SelectTrigger className="w-full mt-1">
              <SelectValue placeholder="Select priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col">
          <Label className="text-sm font-medium text-gray-700">Due Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={'outline'}
                className={`w-full justify-start text-left font-normal mt-2 ${
                  !data.dueDate && 'text-muted-foreground'
                }`}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {data.dueDate ? format(data.dueDate, 'PPP') : 'Pick a date'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={data.dueDate}
                onSelect={(date) => setData({ ...data, dueDate: date! })}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline">
            Cancel
          </Button>
          <Button type="submit">Create</Button>
        </div>
      </form>
    </div>
  )
}
