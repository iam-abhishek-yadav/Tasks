import { Button } from '@/components/ui/button'

const NoIssuesFound = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 py-8">
      <h3 className="text-2xl font-semibold text-gray-800">No Issues Found</h3>
      <p className="text-gray-600 text-center">
        It seems like there are no issues matching your filters or search
        criteria.
        <br />
        You can create a new issue by clicking the button below.
      </p>
      <Button
        onClick={() => {
          console.log('Issue created')
        }}
        className="mt-4"
      >
        Create New Issue
      </Button>
    </div>
  )
}

export default NoIssuesFound
