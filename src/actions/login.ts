"use server";

import * as z from "zod";
import { LoginSchema } from "@/shared/schemas/schemas";
import { signIn } from "@/shared/lib/auth-js/auth";
import { DEFAULT_LOGIN_REDIRECT_URL } from "@/routes";
import { AuthError } from "next-auth";
import { getUserByEmail } from "@/shared/services/user";
import { generateVerificationToken } from "@/shared/lib/tokens";
import { sendVerificationEmail } from "@/shared/lib/email/resend";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFiels = await LoginSchema.safeParseAsync(values);

  if (!validatedFiels.success) {
    return { error: "validate error" };
  }

  const { email, password } = validatedFiels.data;

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
