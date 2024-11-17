import React from "react";
import { IoEyeSharp } from "react-icons/io5";
import Image from "next/image";
import { formatDate } from "@/lib/convertDate";
import Link from "next/link";
import { usePostContext } from "@/context/PostContext";
function Card({
  id,
  title,
  description,
  category,
  pitch,
  views,
  avatar,
  name,
  image,
  created_at,
}: {
  id?: number;
  title?: string;
  description?: string;
  category?: string;
  avatar?:string;
  name?:string;
  pitch?: string;
  views?: number;
  image?: string;
  created_at?: Date;
}) {
  const {increaseView} = usePostContext();
  return (
    <div className="w-[23.5rem] px-6 py-4 border-r-[6px] border-l-2 border-b-[6px] border-t-2 border-white rounded-[20px] hover:border-pink-600  transition-bg duration-300 ease-in-out backdrop-blur-lg  ">
      <div className="flex items-center justify-between mb-4">
        <p className="py-1 px-3 bg-[#db277857] rounded-[20px]">
          {formatDate(created_at!)}
        </p>
        <div className="flex gap-2 items-center">
          <IoEyeSharp className="text-pink-600 text-[1.3rem]" />
          <p className="text-sm">{views}</p>
        </div>
      </div>

      <div className="flex justify-between">
        <div className="mb-2">
          <p className="leading-none">{name}</p>
          <h1 className="text-[1.5rem] font-semibold">{title}</h1>
        </div>
        <figure className="w-10 h-10 rounded-full bg-green-700">

        </figure>
      </div>
      <div className="flex flex-col gap-4">
        <p className="leading-none text-gray-300">{description}</p>
        <figure className="w-full h-36  flex items-center justify-center overflow-hidden rounded-md bg-black-600">
          <Image
            src={image!}
            alt="a post image"
            objectFit="cover"
            objectPosition="center"
            // fill
            width={376}
            height={144}
          />
        </figure>
        <div className="flex justify-between items-center">
          <p className="font-semibold">{category}</p>
          <Link
            href={`/post/${id}`}
            className="px-3 py-1 text-black bg-white rounded-[20px]"
            onClick={()=>increaseView(id!)}
          >
            details
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Card;
