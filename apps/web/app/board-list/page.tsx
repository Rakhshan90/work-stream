import ProjectCard from '@/components/project-card'
import React from 'react'
import { viewEmployeeProjects, viewManagerProjects } from '@/actions/projectManagement';
import { isManager } from '@/actions/userAction';
import AppBar from '@/components/appbar';
import { getEmployeeProjects, getManagerProjects } from '@/lib/project/project';
import { getRole } from '@/lib/user/userRole';


const page = async () => {

  const role = await getRole();
  let projects;
  if(role){
    projects = await getManagerProjects();
  }
  else {
    projects = await getEmployeeProjects();
  }
  
  return (
    <div>
      <AppBar />
      <div className='m-4 flex flex-col gap-4 flex-1'>
        <ProjectCard projects={projects.projects} />
      </div>
    </div>
  )
}

export default page