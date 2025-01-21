"use server";

import * as z from "zod";
import { RegisterSchema } from "@/shared/schemas/schemas";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFiels = await RegisterSchema.safeParseAsync(values);

  if (!validatedFiels.success) {
    return { error: "validate error" };
  }
  return { success: "success" };
};
