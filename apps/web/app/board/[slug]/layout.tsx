import { authOptions } from '@/app/config/authOptions';
import DashboardAppbar from '@/components/dashboard-appbar'
import Sidebar from '@/components/sidebar'
import { getEmployeeProjects, getManagerProjects } from '@/lib/project/project';
import { getUserRole } from '@/lib/user/getUserRole';
import { getServerSession } from 'next-auth';
import React from 'react'

export default async function Layout({ children, params }: { children: React.ReactNode, params: { slug: string } }) {

    const session = await getServerSession(authOptions);
    const role = await getUserRole(Number(session?.user?.id));
    let projects;
    if (role === 'MANAGER') {
        projects = await getManagerProjects();
    }
    else {
        projects = await getEmployeeProjects();
    }

    return (
        <div className="flex flex-col">
            <DashboardAppbar role={role} />
            <div className='flex'>
                <Sidebar role={role} params={params} projects={projects.projects} />
                {children}
            </div>
        </div>
    )
}