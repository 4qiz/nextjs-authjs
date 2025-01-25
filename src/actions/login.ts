"use server";

import * as z from "zod";
import { LoginSchema } from "@/shared/schemas/schemas";
import { signIn } from "@/shared/lib/auth-js/auth";
import { DEFAULT_LOGIN_REDIRECT_URL } from "@/routes";
import { AuthError } from "next-auth";
import { getUserByEmail } from "@/shared/services/user";
import {
  generateTwoFactorToken,
  generateVerificationToken,
} from "@/shared/lib/tokens";
import {
  sendTwoFactorEmail,
  sendVerificationEmail,
} from "@/shared/lib/email/resend";
import {
  getTwoFactorConfirmationByUserId,
  getTwoFactorTokenByEmail,
} from "@/shared/services/two-factor-confirmation";
import { prisma } from "@/shared/lib/db";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFiels = await LoginSchema.safeParseAsync(values);

  if (!validatedFiels.success) {
    return { error: "validate error" };
  }

  const { email, password, code } = validatedFiels.data;

  const existingUser = await getUserByEmail(email);
  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Invalid creds" };
  }

  // token confirmation
  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(email);
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );
    return { success: "confirmation token sent" };
  }
  //
  // 2FA
  if (existingUser.isTwoFactorEnabled) {
    if (code) {
      const twoFactortoken = await getTwoFactorTokenByEmail(existingUser.email);
      if (!twoFactortoken || twoFactortoken.token !== code) {
        return { error: "Invalid code" };
      }
      const hasExpired = new Date(twoFactortoken.expires) < new Date();
      if (hasExpired) {
        return { error: "Code expired" };
      }

      await prisma.twoFactorToken.delete({
        where: { id: twoFactortoken.id },
      });

      const existingConfirmation = await getTwoFactorConfirmationByUserId(
        existingUser.id
      );

      if (existingConfirmation) {
        await prisma.twoFactorConfirmation.delete({
          where: { id: existingConfirmation.id },
        });
      }
      await prisma.twoFactorConfirmation.create({
        data: {
          userId: existingUser.id,
        },
      });
    } else {
      const twoFactortoken = await generateTwoFactorToken(existingUser.email);
      await sendTwoFactorEmail(twoFactortoken.email, twoFactortoken.token);
      return { twoFactor: true };
    }
  }
  //
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT_URL,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      if (error.type == "CredentialsSignin")
        return { error: "Invalid credentials" };
      return { error: "Error" };
    }
    throw error;
  }
};
