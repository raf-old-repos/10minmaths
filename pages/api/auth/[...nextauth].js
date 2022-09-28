import NextAuth from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "../../../util/db";
import GithubProvider from "next-auth/providers/github";
export const nextAuthOptions = {
  adapter: PrismaAdapter(db),
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,

      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  debug: true,
};

export default NextAuth(nextAuthOptions);
