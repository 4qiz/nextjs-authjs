"use server";

import * as z from "zod";
import { RegisterSchema } from "@/shared/schemas/schemas";
import bcryptjs from "bcryptjs";
import { prisma } from "@/shared/lib/db";
import { getUserByEmail } from "@/shared/services/user";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFiels = await RegisterSchema.safeParseAsync(values);

  if (!validatedFiels.success) {
    return { error: "validate error" };
  }

  const { email, password, name } = validatedFiels.data;

  const hashedPassword = await bcryptjs.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "User already exists" };
  }

  await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
    },
  });

  return { success: "success" };
};
