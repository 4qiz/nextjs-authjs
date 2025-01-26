import { useSession } from "next-auth/react";

/**
 * @description Get user from session in client components
 * @returns {User | undefined} User from session
 */
export const useCurrentUser = () => {
  return useSession().data?.user;
};
