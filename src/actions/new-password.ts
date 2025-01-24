"use server";

import * as z from "zod";
import { NewPasswordSchema } from "@/shared/schemas/schemas";
import { getUserByEmail } from "@/shared/services/user";
import { getTokenByToken } from "@/shared/services/verification-token";
import bcryptjs from "bcryptjs";
import { prisma } from "@/shared/lib/db";

export const newPassword = async (
  values: z.infer<typeof NewPasswordSchema>,
  token?: string | null
) => {
  if (!token) {
    return { error: "Token not found" };
  }

  const validatedFiels = await NewPasswordSchema.safeParseAsync(values);

  if (!validatedFiels.success) {
    return { error: "validate error" };
  }

  const { password } = validatedFiels.data;

  const existingToken = await getTokenByToken(token);
  if (!existingToken) {
    return { error: "user not found" };
  }

  const hasExpired = new Date() > new Date(existingToken.expires);
  if (hasExpired) {
    return { error: "Token expired" };
  }

  const user = await getUserByEmail(existingToken.email);
  if (!user) {
    return { error: "user not found" };
  }

  const hashedPassword = await bcryptjs.hash(password, 10);

  await prisma.user.update({
    where: { id: user.id },
    data: {
      password: hashedPassword,
    },
  });

  return { success: "Success" };
};
