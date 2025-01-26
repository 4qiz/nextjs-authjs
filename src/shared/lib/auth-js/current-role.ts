import { UserRole } from "@prisma/client";
import { auth } from "./auth";

/**
 * @description Get user from session in server components
 * @returns {UserRole | undefined} User from session
 */
export const currentRoleAsync = async (): Promise<UserRole | undefined> => {
  const session = await auth();
  return session?.user.role;
};
