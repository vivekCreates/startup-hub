"use client";
import Card from "@/components/Card";
import Center from "@/components/Center";
import { usePostContext } from "@/context/PostContext";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface PostData {
  image?: string;
  pitch?: string;
  category?: string | null;
}

function Page({ params }: { params: { id: string } }) {
  const [data, setData] = useState<PostData | null>(null);
  const {suggestedPosts} = usePostContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/post/${await params.id}`);
        if (!response.ok) {
          console.log("Cannot fetch post data");
          return;
        }
        const result = await response.json();
        setData(result.post);
        console.log(data);
      } catch (error: any) {
        console.error("Error fetching post:", error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full h-auto">
      <Center
        height={"40"}
        mainHeading={"JSM ACADEMY MASTERCLASS"}
        heading={"October 5, 2024"}
        input={false}
        para={
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas molestiae error fuga eveniet itaque repellendus perferendis quia vero maxime? Eius."
        }
      />
      <div className="relative w-[60%] mx-auto h-[70vh] bg-green-950 my-10">
        {data?.image && (
          <Image
            src={data.image!}
            alt="post image"
            layout="fill"   
             // Fill layout for responsive fit
            objectFit="cover"       // Cover to maintain aspect ratio
            objectPosition="center" // Center the image within the container
          />
        )}
      </div>
      <div className="flex justify-between items-center w-[50%] mx-auto">
        <div className="flex gap-4 items-center">
          <figure className="w-12 h-12 rounded-full bg-blue-500"></figure>
          <div>
            <h1>JS-MASTERY</h1>
            <p>@vivekkumar</p>
          </div>
        </div>
        <p className="py-1 px-3 bg-[#db277857] rounded-[20px]">{data?.category}</p>
      </div>
      <div className="w-[50%] mx-auto my-6">
        <h1 className="py-4 text-[1.5rem]">{data?.pitch}</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit...
        </p>
      </div>

      <div className="w-[50%] mx-auto py-4">
        <h1 className="text-[1.5rem] w-[23.5rem] py-4">Similar Startups</h1>
        <div className="flex gap-4 ">
         {
          suggestedPosts.map((item) => (
            <Card
              key={item.id}
              id={item.id}
              title={item.title}
              description={item.description}
              pitch={item.pitch}
              category={item.category}
              views={item.views!}
              image={item.image!}
              created_at={item.created_at!}
            />
          ))
         }
        </div>
      </div>
    </div>
  );
}

export default Page;
