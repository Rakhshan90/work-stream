import { viewEmployeeProjects, viewManagerProjects } from "@/actions/projectManagement";

export const getManagerProjects = async () => {
    try {
      const res = await viewManagerProjects();
      return res;
    } catch (error) {
      return { projects: [], message: 'Failed to get projects' };
    }
  }
  
export const getEmployeeProjects = async () => {
    try {
      const res = await viewEmployeeProjects();
      return res;
    } catch (error) {
      return { projects: [], message: 'Failed to get employee projects' };
    }
  }