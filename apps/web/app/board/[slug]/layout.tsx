import DashboardAppbar from '@/components/dashboard-appbar'
import Sidebar from '@/components/sidebar'
import { getEmployeeProjects, getManagerProjects } from '@/lib/project/project';
import { getRole } from '@/lib/user/userRole';
import React from 'react'

export default async function Layout({ children, params }: { children: React.ReactNode, params: { slug: string } }) {

    const role = await getRole();
    let projects;
    if (role) {
        projects = await getManagerProjects();
    }
    else {
        projects = await getEmployeeProjects();
    }

    return (
        <div className="flex flex-col">
            <DashboardAppbar />
            <div className='flex'>
                <Sidebar params={params} projects={projects.projects} />
                {children}
            </div>
        </div>
    )
}