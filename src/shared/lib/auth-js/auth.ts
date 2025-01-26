import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "../db";
import { getUserById } from "../../services/user";
import { routes } from "@/routes";
import { getTwoFactorConfirmationByUserId } from "@/shared/services/two-factor-confirmation";
import { getAccountByUserId } from "@/shared/services/account";

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

      const existingAccount = await getAccountByUserId(existingUser.id);

      token.isOAuth = !!existingAccount;

      token.name = existingUser.name;
      token.email = existingUser.email;
      token.role = existingUser.role;
      token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;
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
      if (session.user) {
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
        session.user.name = token.name;
        session.user.email = token.email || "";
        session.user.isOAuth = token.isOAuth as boolean;
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
