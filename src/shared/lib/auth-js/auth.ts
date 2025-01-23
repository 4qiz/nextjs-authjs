import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "../db";
import { getUserById } from "../../services/user";

export const { handlers, signIn, signOut, auth } = NextAuth({
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
    // third
    async signIn({ user }) {
      // if (!user.id) {
      //   return false;
      // }
      // const existingUser = await getUserById(user.id);

      // if (!existingUser || !existingUser.emailVerified) {
      //   return false;
      // }
      return true;
    },
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
});
