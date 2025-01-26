"use server";

import { signOut } from "@/shared/lib/auth-js/auth";

export const logout = async () => {
  await signOut();
};
