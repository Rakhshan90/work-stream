import ProjectCard from '@/components/project-card'
import React from 'react'
import AppBar from '@/components/appbar';
import { getEmployeeProjects, getManagerProjects } from '@/lib/project/project';
import { getServerSession } from 'next-auth';
import { authOptions } from '../config/authOptions';
import { getUserRole } from '@/lib/user/getUserRole';


const page = async () => {

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
    <div>
      <AppBar role={role} />
      <div className='m-4 flex flex-col gap-4 flex-1'>
        <ProjectCard role={role} projects={projects.projects} />
      </div>
    </div>
  )
}

export default page