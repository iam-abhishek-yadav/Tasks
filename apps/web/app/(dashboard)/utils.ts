export const getBadgeColor: (
  type: string,
  category: 'status' | 'priority' | 'type'
) => string = (type: string, category: 'status' | 'priority' | 'type') => {
  const colors: Record<string, Record<string, string>> = {
    status: {
      'To Do': 'bg-blue-100 text-blue-800',
      'In Progress': 'bg-yellow-100 text-yellow-800',
      Done: 'bg-green-100 text-green-800',
      default: 'bg-gray-100 text-gray-800',
    },
    priority: {
      Low: 'bg-gray-100 text-gray-800',
      Medium: 'bg-yellow-100 text-yellow-800',
      High: 'bg-red-100 text-red-800',
      default: 'bg-gray-100 text-gray-800',
    },
    type: {
      Bug: 'bg-red-100 text-red-800',
      Feature: 'bg-green-100 text-green-800',
      Improvement: 'bg-blue-100 text-blue-800',
      default: 'bg-gray-100 text-gray-800',
    },
  }

  return colors[category][type] || colors[category].default
}
