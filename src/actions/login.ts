"use server";

import * as z from "zod";
import { LoginSchema } from "@/shared/schemas/schemas";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFiels = await LoginSchema.safeParseAsync(values);

  if (!validatedFiels.success) {
    return { error: "validate error" };
  }
  return { success: "success" };
};
