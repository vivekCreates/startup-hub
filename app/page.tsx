"use client";
// import { auth } from "@/auth";
import Card from "@/components/Card";
import Center from "@/components/Center";
import { usePostContext } from "@/context/PostContext";
import { useEffect, useState } from "react";

export default function Page() {
  const { posts } = usePostContext(); // Keep posts immutable
  const [searchValue, setSearchValue] = useState("");
  const [filteredPosts, setFilteredPosts] = useState(posts);

  useEffect(() => {
    // Filter posts based on searchValue
    const updatedPosts = posts.filter((item) =>
      item.category.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredPosts(updatedPosts);
  }, [searchValue, posts]);

  return (
    <div className="w-full h-auto">
      <Center
        heading={"PITCH, VOTE AND GROW"}
        mainHeading={"PITCH YOUR STARTUP, CONNECT WITH ENTREPRENEURS"}
        para={
          "Submit ideas, vote on pitches, and get noticed in virtual competitions."
        }
        input={true}
        height={"60"}
        setSearchValue={setSearchValue}
      />
      <div className="w-[80%] mx-auto p-5">
        <div className="my-10">
          <h1 className="text-[2rem] font-semibold">{
            searchValue === '' ? <h1>All Startups</h1> :<h1>Search For {searchValue}</h1>
}</h1>
        </div>
        <div className="grid grid-cols-3 gap-5 py-10">
          {filteredPosts.map((item) => (
            <Card
              key={item.id}
              id={item.id}
              title={item.title}
              description={item.description}
              pitch={item.pitch}
              category={item.category}
              views={item.views!}
              image={item.image!}
              avatar={item?.user?.avatar}
              name={item?.user?.name}
              created_at={item.created_at!}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
