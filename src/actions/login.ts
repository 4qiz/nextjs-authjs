"use server";

import * as z from "zod";
import { LoginSchema } from "@/shared/schemas/schemas";
import { signIn, signOut } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT_URL } from "@/routes";
import { AuthError } from "next-auth";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFiels = await LoginSchema.safeParseAsync(values);

  if (!validatedFiels.success) {
    return { error: "validate error" };
  }

  const { email, password } = validatedFiels.data;
  try {
    //await signOut();
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
