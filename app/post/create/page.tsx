'use client';
import { auth } from "@/auth";
import Center from "@/components/Center";
import {  usePostContext } from "@/context/PostContext";
import { getSession } from "next-auth/react";
import { setConfig } from "next/config";
import { redirect, useRouter } from "next/navigation";
import React, { useContext, useState } from "react";

export default function Page() {

const router = useRouter()

  const [post, setPost] = useState({
    title: "",
    description: "",
    category: "",
    image: null, // Start as null for file input
    pitch: "",
  });

const {setPosts} = usePostContext();

  const handleInput = (e:any) => {
    const { name, value, files } = e.target;
    setPost((prev) => ({
      ...prev,
      [name]: files ? files[0] : value, // Set file or value
    }));
  };

  const handleFormSubmit = async (e:any) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("title", post.title);
    fd.append("description", post.description);
    fd.append("category", post.category);
    if (post.image) fd.append("image", post.image); // Only append if image is present
    fd.append("pitch", post.pitch);

    try {
      const response = await fetch("/api/post/create", {
        method: "POST",
        body: fd, // Omit Content-Type header for FormData
      });

      if (!response.ok) {
        throw new Error("Failed to upload post");
      }

      const data = await response.json();
      setPosts((prev:any)=>([...prev,data.post]))
      alert(data.message);
      router.push('/')
      setPost({
        title: "",
        description: "",
        category: "",
        image: null, // Start as null for file input
        pitch: "",

      })

    } catch (error:any) {
      alert(error.message);
      console.error("Error submitting post:", error.message);
    }
  };

  return (
    <div className="w-full h-auto">
      <Center mainHeading={"SUBMIT YOUR STARTUP PITCH"} height={"25"} />
      <form onSubmit={handleFormSubmit} className="w-[40%] mx-auto flex flex-col gap-5 py-10">
        <label htmlFor="">TITLE</label>
        <input
          className="w-full rounded-full border-2 border-white py-3 px-4 bg-black"
          type="text"
          name="title"
          onChange={handleInput}
          value={post.title}
        />
        <label htmlFor="">DESCRIPTION</label>
        <textarea
          className="w-full h-[10rem] rounded-lg border-2 border-white py-3 px-4 bg-black"
          name="description"
          onChange={handleInput}
          value={post.description}
        />
        <label htmlFor="">CATEGORY</label>
        <input
          className="w-full rounded-full border-2 border-white py-3 px-4 bg-black"
          type="text"
          name="category"
          onChange={handleInput}
          value={post.category}
          placeholder="Choose a category (e.g.,Tech, Health, Education, etc.)"
        />
        <label htmlFor="image">IMAGE</label>
        <input
          className="w-full rounded-full border-2 border-white py-3 px-4 bg-black"
          type="file"
          name="image"
          onChange={handleInput}
          placeholder="Upload an image"
        />
        <label htmlFor="">PITCH</label>
        <textarea
          className="w-full h-[14rem] rounded-lg border-2 border-white py-3 px-4 bg-black"
          name="pitch"
          value={post.pitch}
          onChange={handleInput}
        />
        <button type="submit" className="bg-pink-600 rounded-lg py-3 px-4">
          Submit your Pitch
        </button>
      </form>
    </div>
  );
}
