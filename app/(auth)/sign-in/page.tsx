"use client"; // Ensure the component is a Client Component

import { signIn } from "next-auth/react";
import Link from "next/link";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { login } from "@/actions/user";

export default function SignIn() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="flex rounded gap-4 flex-col w-[30rem] py-10 px-16 border border-slate-600">
        <form action={login} className="flex flex-col gap-4">
          <h1 className="text-center text-[1.3rem] uppercase font-sans font-medium">
            Sign in to Startup Hub
          </h1>
          <label className="block">
            Email
            <input
              className="block px-4 py-1 w-full bg-slate-500 rounded"
              name="email"
              type="email"
            />
          </label>
          <label className="block">
            Password
            <input
              className="block px-4 py-1 w-full bg-slate-500 rounded"
              name="password"
              type="password"
            />
          </label>
          <button className="px-4 py-2 mt-3 bg-pink-600 rounded">
            Sign In
          </button>

          {/* Social Login Buttons */}
          <div className="w-full flex gap-2 mt-4">
           
            <div className="w-[100%]">
              <button
                type="button"
                onClick={() => signIn("github")} // Interactive event
                className="w-[100%] text-[1rem] border border-slate-500 rounded px-4 py-1 flex items-center justify-center gap-2"
              >
                <FaGithub />
                <p>Github</p>
              </button>
            </div>
          </div>
        </form>

        <p className="mt-4 text-center">
          Don't have an account?{" "}
          <Link className="text-blue-400" href="/sign-up">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
