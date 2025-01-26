"use server";

import { currentUserAsync } from "@/shared/lib/auth-js/current-user";
import { prisma } from "@/shared/lib/db";
import { sendVerificationEmail } from "@/shared/lib/email/resend";
import { generateVerificationToken } from "@/shared/lib/tokens";
import { SettingsSchema } from "@/shared/schemas/schemas";
import { getUserByEmail, getUserById } from "@/shared/services/user";
import * as z from "zod";
import bcryptjs from "bcryptjs";

export const settings = async (values: z.infer<typeof SettingsSchema>) => {
  const user = await currentUserAsync();
  if (!user) {
    return { error: "Unauthorized" };
  }

  const userDb = await getUserById(user.id!!);
  if (!userDb) {
    return { error: "Unauthorized" };
  }

  if (user.isOAuth) {
    values.email = undefined;
    values.password = undefined;
    values.newPassword = undefined;
    values.isTwoFactorEnabled = undefined;
  }

  // change email
  if (values.email && values.email !== userDb.email) {
    const existingUser = await getUserByEmail(values.email);
    if (existingUser && existingUser.id !== user.id) {
      return { error: "Email already in use" };
    }

    const verificationToken = await generateVerificationToken(values.email);
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );
    return { success: "Verification email sent" };
  }

  // chage password
  if (values.newPassword && values.password && userDb.password) {
    const passwordsMatch = await bcryptjs.compare(
      values.password,
      userDb.password
    );
    if (!passwordsMatch) {
      return { error: "Password incorrect" };
    }

    const hashPassword = await bcryptjs.hash(values.newPassword, 10);
    values.password = hashPassword;
    values.newPassword = undefined;
  }

  await prisma.user.update({
    where: {
      id: userDb.id,
    },
    data: {
      ...values,
    },
  });

  return { success: "Settings updated" };
};
