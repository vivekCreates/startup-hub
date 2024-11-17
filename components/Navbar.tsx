
import { auth, signOut } from "@/auth";

import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

export default async function Navbar() {
  const session = await auth();


  return (
    <nav className="w-full h-14 flex items-center justify-between py-6 px-12">
      <div className="flex gap-2 items-center font-bold font-monolisa text-red-600">
        <Image
          className="bg-black"
          src="https://png.pngtree.com/png-vector/20230318/ourmid/pngtree-startup-rocket-transport-icon-vector-png-image_6653460.png" // For local images
          alt="Description of the image"
          width={55} // Specify the image width
          height={55} // Specify the image height
        />
        <h1>STARTUP</h1>
      </div>
      <div className="flex items-center gap-5">
        {
           session?.user &&
        <Link href={"/post/create"}>Create</Link>
        }
        <form action={async()=>{
          "use server";
          await signOut({redirectTo:"/sign-in"})
        }}>

        {session?.user ? (
          <button type="submit">
            {" "}
            Logout
          </button>
        ) : (
          <button type="submit" >SignIn</button>
        )}
        </form>
        {
          session?.user &&
        <figure className="w-10 h-10 rounded-full bg-green-700 overflow-hidden">
          <Link href={"/profile"} >
        <Image 
        src={session?.user.avatar!}
         width={40} 
         height={40}
          alt="avatar"
          />
          </Link>
        </figure>
        }
      </div>
    </nav>
  );
}

