import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "../../schemas/schemas";
import { getUserByEmail } from "../../services/user";
import bcrypt from "bcryptjs";

export default {
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      authorize: async (credentials) => {
        const validatedFields = await LoginSchema.safeParseAsync(credentials);
        if (validatedFields.success) {
          const { email, password } = validatedFields.data;
          const user = await getUserByEmail(email);
          if (!user || !user.password) {
            throw new Error("Invalid credentials.");
          }
          const passwordMatch = await bcrypt.compare(password, user.password);
          if (passwordMatch) {
            return user;
          }
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
