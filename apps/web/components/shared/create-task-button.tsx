import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import AddTask from './add-task'
const CreateTaskButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create Task</Button>
      </DialogTrigger>
      <DialogContent>
        <AddTask />
      </DialogContent>
    </Dialog>
  )
}

export default CreateTaskButton
