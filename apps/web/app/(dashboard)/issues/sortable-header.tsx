import { Button } from '@/components/ui/button'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { Issue } from '../types'

type SortableHeaderProps = {
  label: string
  field: string
  sortField: string
  sortDirection: 'asc' | 'desc'
  onSort: (field: keyof Issue) => void
  className?: string
}

const SortableHeader = ({
  label,
  field,
  sortField,
  sortDirection,
  onSort,
  className = '',
}: SortableHeaderProps) => {
  return (
    <Button
      variant="ghost"
      onClick={() => onSort(field as keyof Issue)}
      className={`hover:bg-transparent ${className}`}
    >
      {label}{' '}
      {sortField === field &&
        (sortDirection === 'asc' ? (
          <ChevronUp className="ml-2 h-4 w-4" />
        ) : (
          <ChevronDown className="ml-2 h-4 w-4" />
        ))}
    </Button>
  )
}

export default SortableHeader
