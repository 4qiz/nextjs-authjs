"use server";

import * as z from "zod";
import { ResetSchema } from "@/shared/schemas/schemas";
import { getUserByEmail } from "@/shared/services/user";
import { generateVerificationToken } from "@/shared/lib/tokens";
import { sendPasswordResetEmail } from "@/shared/lib/email/resend";

export const resetPassword = async (values: z.infer<typeof ResetSchema>) => {
  const validatedFiels = await ResetSchema.safeParseAsync(values);

  if (!validatedFiels.success) {
    return { error: "validate error" };
  }

  const { email } = validatedFiels.data;

  const existingUser = await getUserByEmail(email);
  if (!existingUser) {
    return { error: "user not found" };
  }

  const passwordResetToken = await generateVerificationToken(
    existingUser.email
  );

  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token
  );
  return { success: "Email sent" };
};
