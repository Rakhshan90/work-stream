import { isManager } from "@/actions/userAction";

export const getRole = async () => {
    try {
      const res = await isManager();
      return res;
    } catch (error) {
      return {
        message: 'Something went wrong while getting role of the user',
      }
    }
  }