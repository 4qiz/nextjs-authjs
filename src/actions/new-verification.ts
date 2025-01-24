"use server";

import { prisma } from "@/shared/lib/db";
import { getUserByEmail } from "@/shared/services/user";
import { getTokenByToken } from "@/shared/services/verification-token";

export const newVerification = async (token: string) => {
  const existingToken = await getTokenByToken(token);
  if (!existingToken) {
    return { error: "token does not exist" };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  const existingUser = await getUserByEmail(existingToken.email);
  if (!existingUser) {
    return { error: "user does not exist" };
  }

  await prisma.user.update({
    where: {
      id: existingUser.id,
    },
    data: {
      emailVerified: new Date(),
      email: existingToken.email,
    },
  });

  await prisma.verificationToken.delete({ where: { token } });

  return { success: "verified" };
};
