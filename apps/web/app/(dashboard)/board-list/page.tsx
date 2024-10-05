import ProjectCard from '@/components/project-card'
import React from 'react'
import { viewManagerProjects } from '@/actions/projectManagement';


const getProjects = async () => {
  try {
    const res = await viewManagerProjects();
    return res;
  } catch (error) {
    return {projects: [], message: 'Failed to get projects'};
  }
}


const page = async () => {

  const res = await getProjects();
  const projects = res?.projects;
  const message = res?.message;

  return (
    <div className='m-4 flex flex-col gap-4 flex-1'>
      <ProjectCard projects={projects} message={message} />
    </div>
  )
}

export default page