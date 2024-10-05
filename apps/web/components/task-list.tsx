import React from 'react'
import { Card } from './ui/card'
import { Ellipsis } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from './ui/button'
import TaskStatus from './task-status'
import CreateTask from './create-task'


const TaskList = ({id}: {id: number}) => {
  return (
    <div className='flex gap-4'>

      {/* Add task */}
      <CreateTask id={id} />

      {/* Pending tasks */}
      <Card className='bg-slate-900 border-none px-2 py-4 w-64'>
        <div className="flex flex-col gap-3">
          <h2 className="text-left text-slate-500 text-md font-bold">Pending Tasks</h2>
          <div className="flex flex-col gap-2">
            <div className="w-full flex justify-between items-center bg-slate-800 p-2 rounded-xl">
              <div className="text-left text-slate-300 text-md">Project planning</div>
              <TaskStatus />
            </div>
            <div className="w-full flex justify-between items-center bg-slate-800 p-2 rounded-xl">
              <div className="text-left text-slate-300 text-md">Meeting kickoff</div>
              <TaskStatus />
            </div>
          </div>
        </div>
      </Card>

      {/* On-going tasks */}
      <Card className='bg-slate-900 border-none px-2 py-4 w-64'>
        <div className="flex flex-col gap-3">
          <h2 className="text-left text-slate-500 text-md font-bold">On-going Tasks</h2>
          <div className="flex flex-col gap-2">
            <div className="w-full flex justify-between items-center bg-slate-800 p-2 rounded-xl">
              <div className="text-left text-slate-300 text-md">Project planning</div>
              <TaskStatus />
            </div>
          </div>
        </div>
      </Card>


      {/* Completed tasks */}
      <Card className='bg-slate-900 border-none px-2 py-4 w-64'>
        <div className="flex flex-col gap-3">
          <h2 className="text-left text-slate-500 text-md font-bold">Completed Tasks</h2>
          <div className="flex flex-col gap-2">
            <div className="w-full flex justify-between items-center bg-slate-800 p-2 rounded-xl">
              <div className="text-left text-slate-300 text-md">Project planning</div>
              <TaskStatus />
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default TaskList