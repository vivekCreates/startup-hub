"use client";
// import { auth, signIn } from "@/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";


export default function SignUp() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser((prev) => ({ ...prev, [name]: value }));
    console.log("user", user);
  };

  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    console.log("hello");
    try {
      fetch(`/api/sign-up`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      })
        .then((response) => {
          console.log('response',response)
          if (!response.ok) {
            throw new Error("User can't Sign Up");
          }
          return response.json();
        })
        .then((data) => {
          if (!data.success) {
            throw new Error("User not Sign Up");
          }
          console.log('data',data)
          alert("User signed up successfully");
          redirect('/sign-in')
        })
        .catch((error) => {
          alert(error.message);
        });
    } catch (error: any) {
      alert(error.message);
    }
  };
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <form
        className="flex rounded gap-4 flex-col w-[30rem] py-10 px-16 border border-slate-600"
        onSubmit={handleFormSubmit}
      >
        <h1 className="text-center text-[1.3rem] uppercase font-sans font-medium">
          Sign up to Startup hub
        </h1>
        <label className="block">
          username
          <input
            value={user.name}
            className="block px-4 py-1 w-full bg-slate-500 rounded"
            name="name"
            type="text"
            onChange={handleInput}
          />
        </label>
        <label className="block">
          Email
          <input
            value={user.email}
            className="block px-4 py-1 w-full bg-slate-500 rounded"
            name="email"
            type="email"
            onChange={handleInput}
          />
        </label>
        <label className="block">
          Password
          <input
            value={user.password}
            className="block px-4 py-1 w-full bg-slate-500 rounded"
            name="password"
            type="password"
            onChange={handleInput}
          />
        </label>

        <input
          type="submit"
          className="px-4 py-2 bg-pink-600 rounded"
          value={"SignUp"}
        />
        <p className="mt-4">
          If you already have an account ?{" "}
          <Link
            className="text-blue-400"
            href={"/sign-in"}
          >
            sign-in
          </Link>
        </p>
      </form>
    </div>
  );
}
