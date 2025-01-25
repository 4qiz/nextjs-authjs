import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "../db";
import { getUserById } from "../../services/user";
import { routes } from "@/routes";
import { getTwoFactorConfirmationByUserId } from "@/shared/services/two-factor-confirmation";

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: routes.signIn(),
    error: routes.authError(),
  },
  callbacks: {
    // first
    async jwt({ token }) {
      if (!token.sub) {
        return token;
      }
      const existingUser = await getUserById(token.sub);
      if (!existingUser) {
        return token;
      }
      token.role = existingUser.role;
      return token; // токен передаётся в сессию
    },
    // second
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.role && session.user) {
        session.user.role = token.role;
      }
      return session;
    },
    // third, token confirmation, check email verification
    async signIn({ user, account }) {
      // allow oauth without email email verification
      if (account?.provider !== "credentials") {
        return true;
      }

      if (!user.id) {
        return false;
      }
      const existingUser = await getUserById(user.id);

      if (!existingUser?.emailVerified) {
        return false;
      }

      // 2FA
      if (existingUser.isTwoFactorEnabled) {
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
          existingUser.id
        );

        if (!twoFactorConfirmation) {
          return false;
        }
        // delete
        await prisma.twoFactorConfirmation.delete({
          where: { id: twoFactorConfirmation.id },
        });
      }

      return true;
    },
  },
  events: {
    async linkAccount({ user }) {
      await prisma.user.update({
        where: { id: user.id },
        data: {
          emailVerified: new Date(),
        },
      });
    },
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
});
