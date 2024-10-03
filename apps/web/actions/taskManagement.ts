import db from '@repo/db/client';
import { taskSchema } from '@repo/validation-schema/zod-schema';
import { TaskStatus, TaskPriority } from '@repo/db/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/config/authOptions';

export const createTask = async (projectId: number, employeeId: number, title: string, description: string,
    startDate: Date, endDate: Date, status: TaskStatus, priority: TaskPriority
) => {

    const session = await getServerSession(authOptions);
    if (!session.user || session?.user?.id) {
        return {
            message: 'You are not authenticated, try to login again'
        }
    }

    const { success } = taskSchema.safeParse({
        projectId,
        title,
        description,
        startDate,
        endDate,
        status,
        priority
    });

    if (!success) {
        return {
            message: 'Failed to create task due to invalid input types'
        }
    }

    try {
        const manager = await db.user.findFirst({
            where: { id: Number(session?.user?.id) },
        });

        if (manager?.role !== 'MANAGER') {
            return {
                message: 'You are not allowed to create a task, only manager can do this'
            }
        }

        const project = await db.project.findFirst({
            where: { id: projectId }
        });

        if (!project) {
            return {
                message: 'The project does not exist.'
            };
        }

        const existingTask = await db.task.findFirst({
            where: {
                title,
                projectId,
            }
        });

        if (existingTask) {
            return {
                message: 'A task with this title already exists for this project.'
            };
        }

        if (endDate < startDate) {
            return {
                message: 'The end date cannot be earlier than the start date.'
            };
        }

        const employee = await db.user.findFirst({ where: { id: employeeId, role: 'EMPLOYEE' } });
        if (!employee) {
            return { message: 'Invalid employee assignment.' };
        }

        await db.task.create({
            data: {
                title,
                description,
                projectId,
                startDate,
                endDate,
                status,
                priority,
                employeeId: Number(session?.user?.id)
            }
        });

        return {
            message: 'Task created successfully',
        }

    } catch (error) {
        return {
            message: 'Failed to create task, try again'
        }
    }

}

export const updateTaskStatus = async (taskId: number, status: TaskStatus) => {

    const session = await getServerSession(authOptions);
    if (!session.user || session?.user?.id) {
        return {
            message: 'You are not authenticated, try to login again'
        }
    }

    try {
        const employee = await db.user.findFirst({
            where: { id: Number(session?.user?.id) },
        });

        if (employee?.role !== 'EMPLOYEE') {
            return {
                message: 'You are not allowed to update the status of the task'
            }
        }

        const task = await db.task.findFirst({
            where: { id: taskId }
        });

        if (task?.employeeId !== Number(session?.user?.id)) {
            return {
                message: 'You are not allowed to update the status of the task'
            }
        }

        if (status === 'COMPLETED' && task.status !== 'ONGOING') {
            return {
                message: 'You must first mark the task as Ongoing before marking it as Completed.'
            };
        }

        await db.task.update({
            where: { id: taskId },
            data: {
                status,
            }
        });

        return {
            message: 'Task status updated successfully'
        }

    } catch (error) {
        return {
            message: 'Failed to update task status, try again'
        }
    }

}

export const getAssignedTasks = async (projectId: number) => {
    const session = await getServerSession(authOptions);
    if (!session?.user || session?.user?.id) {
        return {
            message: 'You are not authenticated, try to login again'
        }
    }

    try {

        const employee = await db.user.findFirst({
            where: { id: Number(session?.user?.id) },
        });

        if (employee?.role !== 'EMPLOYEE') {
            return {
                message: 'You are not allowed to get the tasks'
            }
        }

        const project = await db.project.findFirst({
            where: { id: projectId }
        });

        if (!project) {
            return {
                message: 'The project does not exist.'
            };
        }

        const assignedTasks = await db.task.findMany({
            where: {
                projectId,
                employeeId: Number(session?.user?.id),
            },
        });

        return {
            message: 'All the project specific assigned tasks have been fetched',
            assignedTasks: assignedTasks || [],
        }

    } catch (error) {
        return {
            message: 'Failed to get assigned tasks'
        }
    }
}

export const getOverDueTasks = async (projectId: number) => {
    const session = await getServerSession(authOptions);
    if (!session.user || session?.user?.id) {
        return {
            message: 'You are not authenticated, try to login again'
        }
    }

    try {
        const manager = await db.user.findFirst({
            where: { id: Number(session?.user?.id) },
        });

        if (manager?.role !== 'MANAGER') {
            return {
                message: 'You are not allowed to get overdue tasks'
            }
        }

        const project = await db.project.findFirst({
            where: { id: projectId }
        });
        
        if(!project) {
            return {
                message: 'The project does not exist.'
            };
        }

        const overdueTasks = await db.task.findMany({
            where: {
                projectId,
                endDate: {
                    lt: new Date(),
                },
                status: {
                    in: ['ONGOING', 'PENDING'],
                }
            }
        });

        return {
            message: 'All overdue tasks have been fetched successfully',
            overdueTasks: overdueTasks || [],
        };

    } catch (error) {
        return {
            message: 'Failed to get tasks'
        }
    }
}