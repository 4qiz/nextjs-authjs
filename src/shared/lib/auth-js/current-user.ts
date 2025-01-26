import { auth } from "./auth";

/**
 * @description Get user from session in server components
 * @returns {User | undefined} User from session
 */
export const currentUserAsync = async () => {
  const session = await auth();
  return session?.user;
};
