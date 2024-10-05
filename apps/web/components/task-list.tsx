import React from 'react'
import { Card } from './ui/card'
import TaskStatus from './task-status'
import CreateTask from './create-task'
import { getProjectPendingTasks } from '@/actions/taskManagement'


const TaskList = async ({ id }: { id: number }) => {

  const getPendingTasks = async () => {
    const res = await getProjectPendingTasks(id);
    return res.tasks;
  }

  const pendingTasks = await getPendingTasks();

  return (
    <div className='flex gap-4'>

      {/* Add task */}
      <CreateTask id={id} />

      {/* Pending tasks */}
      <Card className='bg-slate-900 border-none px-2 py-4 w-64'>
        <div className="flex flex-col gap-3">
          <h2 className="text-left text-slate-500 text-md font-bold">Pending Tasks</h2>
          <div className="flex flex-col gap-2">
            {pendingTasks?.map((item, index) => (
              <div key={index} className="w-full flex justify-between items-center bg-slate-800 p-2 rounded-xl">
                <div className="text-left text-slate-300 text-md">{item?.title}</div>
                <TaskStatus />
              </div>
            ))}
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