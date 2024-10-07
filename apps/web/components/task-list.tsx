import React from 'react'
import { Card } from './ui/card'
import TaskDetail from './task-detail'
import { getAssignedCompletedProjectTasks, getAssignedOngoingProjectTasks, getAssignedPendingProjectTasks, getOverDueTasks, getProjectCompletedTasks, getProjectPendingTasks } from '@/actions/taskManagement'
import { getRole } from '@/lib/user/userRole'


const TaskList = async ({ id }: { id: number }) => {

  const getPendingTasks = async () => {
    const res = await getProjectPendingTasks(id);
    return res.tasks;
  }
  const getOngoingTasks = async () => {
    const res = await getProjectCompletedTasks(id);
    return res.tasks;
  }
  const getCompletedTasks = async () => {
    const res = await getProjectCompletedTasks(id);
    return res.tasks;
  }
  const getAssignedPendingTasks = async () => {
    const res = await getAssignedPendingProjectTasks(id);
    return res.assignedTasks;
  }
  const getAssignedOngoingTasks = async () => {
    const res = await getAssignedOngoingProjectTasks(id);
    return res.assignedTasks;
  }
  const getAssignedCompletedTasks = async () => {
    const res = await getAssignedCompletedProjectTasks(id);
    return res.assignedTasks;
  }
  const overdueTasks = async () => {
    const res = await getOverDueTasks(id);
    return res.overdueTasks;
  }

  const role = await getRole();
  let pendingTasks;
  if (role) {
    // only manager can retrieve pending tasks within project
    pendingTasks = await getPendingTasks();
  }
  else {
    // only assigned task can be retrieved by the employee within project
    pendingTasks = await getAssignedPendingTasks();
  }

  let ongoingTasks;
  if (role) {
    // only manager can retrieve pending tasks within project
    ongoingTasks = await getOngoingTasks();
  }
  else {
    // only assigned task can be retrieved by the employee within project
    ongoingTasks = await getAssignedOngoingTasks();
  }

  let completedTasks;
  if (role) {
    completedTasks = await getCompletedTasks();
  }
  else {
    completedTasks = await getAssignedCompletedTasks();
  }

  let incompletedTasks;
  if (role) {
    incompletedTasks = await overdueTasks();
  }

  return (
    <div className='flex-1 flex flex-col gap-4 lg:flex-row lg:flex-auto'>
      {/* Pending tasks */}
      <Card className='bg-slate-900 border-none px-2 py-4 w-64'>
        <div className="flex flex-col gap-3">
          <h2 className="text-left text-slate-500 text-md font-bold">Pending Tasks</h2>
          <div className="flex flex-col gap-2">
            {pendingTasks?.map((item, index) => (
              <div key={index} className="w-full flex justify-between items-center bg-slate-800 p-2 rounded-xl">
                <div className="text-left text-slate-300 text-md">{item?.title}</div>
                <TaskDetail taskId={item?.id} role={role} title={item?.title} description={item?.description}
                  status={item?.status} startDate={item?.startDate.toDateString()}
                  endDate={item?.endDate.toDateString()} priority={item?.priority}
                  employee={item?.employee} />
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
            {ongoingTasks?.map((item, index) => (
              <div key={index} className="w-full flex justify-between items-center bg-slate-800 p-2 rounded-xl">
                <div className="text-left text-slate-300 text-md">{item?.title}</div>
                <TaskDetail taskId={item?.id} role={role} title={item?.title} description={item?.description}
                  status={item?.status} startDate={item?.startDate.toDateString()}
                  endDate={item?.endDate.toDateString()} priority={item?.priority}
                  employee={item?.employee} />
              </div>
            ))}
          </div>
        </div>
      </Card>


      {/* Completed tasks */}
      <Card className='bg-slate-900 border-none px-2 py-4 w-64'>
        <div className="flex flex-col gap-3">
          <h2 className="text-left text-slate-500 text-md font-bold">Completed Tasks</h2>
          <div className="flex flex-col gap-2">
            {completedTasks?.map((item, index) => (
              <div key={index} className="w-full flex justify-between items-center bg-slate-800 p-2 rounded-xl">
                <div className="text-left text-slate-300 text-md">{item?.title}</div>
                <TaskDetail taskId={item?.id} role={role} title={item?.title} description={item?.description}
                  status={item?.status} startDate={item?.startDate.toDateString()}
                  endDate={item?.endDate.toDateString()} priority={item?.priority}
                  employee={item?.employee} />
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Overdue tasks */}
      {role ? (
        <Card className='bg-slate-900 border-none px-2 py-4 w-64'>
          <div className="flex flex-col gap-3">
            <h2 className="text-left text-slate-500 text-md font-bold">Overdue Tasks</h2>
            <div className="flex flex-col gap-2">
              {incompletedTasks?.map((item, index) => (
                <div key={index} className="w-full flex justify-between items-center bg-red-800 p-2 rounded-xl">
                  <div className="text-left text-slate-300 text-md">{item?.title}</div>
                  <TaskDetail taskId={item?.id} role={role} title={item?.title} description={item?.description}
                    status={item?.status} startDate={item?.startDate.toDateString()}
                    endDate={item?.endDate.toDateString()} priority={item?.priority}
                    employee={item?.employee} />
                </div>
              ))}
            </div>
          </div>
        </Card>
      ) : null}
    </div>
  )
}

export default TaskList