import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "./lib/db";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";


export const { signIn, signOut, handlers, auth } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),

    Credentials({
      name: "credentials",
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials): Promise<any> => {
        try {
          const email = credentials?.email as string | undefined;
          const password = credentials?.password as string | undefined;

          if (!email || !password) {
            throw new Error("All fields are required")
          }

          const user = await prisma.user.findUnique({
            where: { email },
          });

          if (!user) {
            throw new Error("Invalid credentials");
          }

          const isPasswordCorrect = await bcrypt.compare(password, user.password);
          if (!isPasswordCorrect) {
            throw new Error("Email or password is incorrect");
          }

          return user;
        } catch (error: any) {
          throw new Error(error.message);
        }
      },
    }),
  ],

  pages: {
    signIn: "/sign-in",
  },
  session:{
    strategy:"jwt"
  },
  callbacks: {
    async jwt({ token, user }) {
      // Include user fields in the token if available (only on login)
      if (user) {
        token.id = user.id as string;
        token.name = user.name as string;
        token.password = user.password as string;
        token.email = user.email as string;
        token.avatar = user.avatar as string;
        token.created_at = user.created_at as Date;
      }
      return token;
    },

    async session({ session, token }) {
      // Populate session user with fields from token
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name as string;
        session.user.password = token.password as string;
        session.user.avatar = token.avatar as string;
        session.user.email = token.email as string;
        session.user.created_at = token.created_at as Date;
      }
      return session;
    }
  }, secret:process.env.AUTH_SECRET!
});

