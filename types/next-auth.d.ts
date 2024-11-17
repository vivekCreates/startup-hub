// next-auth.d.ts
import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import "next-auth/jwt";

// Extend the default `User` interface in NextAuth
declare module "next-auth" {
  interface User extends DefaultUser {
    id:number;
    name?: string;
    email?: string;
    avatar?:string;
    password?:string;
    created_at?: Date;
    // Do not include `password` here, as it shouldn't be exposed
  }

  interface Session extends DefaultSession {
    user: {
      id:string;
      name?: string;
      email?: string;
      avatar?:string;
      password?:string
      created_at?: Date;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id:string;
    name?: string;
    email?: string;
    avatar?:string;
    created_at?: Date;
  }
}
