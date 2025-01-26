import { UserRole } from "@prisma/client";
import { useSession } from "next-auth/react";

/**
 * @description Get role from session in client components
 * @returns {UserRole | undefined} role from session
 */
export const useCurrentRole = (): UserRole | undefined => {
  return useSession().data?.user.role;
};
