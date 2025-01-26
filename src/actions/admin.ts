"use server";
import { currentRoleAsync } from "@/shared/lib/auth-js/current-role";
import { UserRole } from "@prisma/client";

export const admin = async () => {
  const role = await currentRoleAsync();
  if (role !== UserRole.ADMIN) {
    return { error: "No access" };
  }
  return { success: "You are allowed to access" };
};
