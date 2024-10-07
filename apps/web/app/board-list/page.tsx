import ProjectCard from '@/components/project-card'
import React from 'react'
import { viewEmployeeProjects, viewManagerProjects } from '@/actions/projectManagement';
import { isManager } from '@/actions/userAction';
import AppBar from '@/components/appbar';


const getProjects = async () => {
  try {
    const res = await viewManagerProjects();
    return res;
  } catch (error) {
    return { projects: [], message: 'Failed to get projects' };
  }
}

const getEmployeeProjects = async () => {
  try {
    const res = await viewEmployeeProjects();
    return res;
  } catch (error) {
    return { projects: [], message: 'Failed to get employee projects' };
  }
}

const getRole = async () => {
  try {
    const res = await isManager();
    return res;
  } catch (error) {
    return {
      message: 'Something went wrong while getting role of the user',
    }
  }
}


const page = async () => {

  const role = await getRole();
  let projects;
  if(role){
    projects = await getProjects();
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