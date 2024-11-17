"use client";

import { auth } from "@/auth";
import Card from "@/components/Card";
import Center from "@/components/Center";
import { usePostContext } from "@/context/PostContext";
import Image from "next/image";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";

// Define the type for a post
type Post = {
  id: number;
  title: string;
  description: string;
  category: string;
  pitch: string;
  user:{
    avatar:string;
    name:string;
  },
  views: number;
  image: string;
  created_at: Date;
};

// Define the type for the profile
type Profile = {
  name?: string;
  email?: string;
  posts?: Post[];
  avatar?:string;
};

export default function Page() {
  const [profile, setProfile] = useState<Profile>({ posts: [] });

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const response = await fetch("/api/me");
        if (!response.ok) {
          throw new Error("Cannot get user Profile");
        }
        const data = await response.json();
        setProfile(data.user);
        console.log("profile", data.user);
      } catch (error: any) {
        console.log(error.message);
      }
    };
    getUserProfile();
  }, []);

  return (
    <div className="w-[80%] mx-auto my-20">
      <div className="flex gap-10">
        <div className="w-[17rem] h-[22rem] bg-pink-600 flex-col items-center justify-center rounded-lg gap-5 relative">
          <h1 className="w-[90%] z-10 absolute text-center left-[5%] text-[1.5rem] font-semibold bg-black rounded-lg border-4 mx-auto -mt-7 py-1 border-white">
            {profile?.name || "User Name"}
          </h1>
          <h1 className="w-[90%] z-1 -rotate-6 absolute text-center left-[5%] text-[1.5rem] font-semibold bg-white rounded-lg border-4 mx-auto -mt-7 py-1">
            {profile?.name || "User Name"}
          </h1>
          <figure className="w-[12rem] overflow-hidden h-[12rem] rounded-full relative left-[15%] mt-12 bg-green-800 text-center">
            <Image
            src={profile.avatar!}
            objectPosition="center"
            objectFit="cover"
            fill
            alt="user image"
            />
          </figure>
          <h1 className="text-[1.7rem] font-semibold text-center">
            {profile?.email || "user@example.com"}
          </h1>
          <p className="text-center mt-1 text-sm">Nothing here as of now</p>
        </div>
        <div className="w-[70%] h-auto flex gap-5 flex-wrap">
          <h1 className="text-[1.5rem] font-semibold">All Startups</h1>
          <div className="flex gap-4 flex-wrap">
               {profile.posts?.length ? (
            profile.posts.map((item) => (
              <Card
                key={item.id} // Add a unique key
                id={item.id}
                title={item.title || "Untitled"}
                description={item.description || "No description"}
                category={item.category || "General"}
                pitch={item.pitch || "No pitch"}
                avatar={item?.user?.avatar || ""}
                name={item?.user?.name || ""}
                views={item.views || 0}
                image={item.image || ""}
                created_at={item.created_at! || ""}
              />
            ))
          ) : (
            <p>No posts available.</p>
          )}
        </div>
      </div>
    </div>
    </div>
  );
}
