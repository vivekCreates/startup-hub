import prisma from '@/lib/db';
import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { auth } from '@/auth';
import { getSession } from 'next-auth/react';


// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

interface PostResponse {
  title?: string;
  description?: string;
  category?: string;
  pitch?: string;
  image?: string;
  user_id?: number;
  user?:number;
}

export async function POST(request: NextRequest) {
  const formData = await request.formData();

  const title = formData.get("title") as string | null;
  const description = formData.get("description") as string | null;
  const category = formData.get("category") as string | null;
  const pitch = formData.get("pitch") as string | null;
  const image = formData.get("image") as File | null;

  const session = await auth();
  console.log("session",session)
  
  if (!session?.user) {
    return NextResponse.json(
      {
        success: false,
        message: "user not authorized",
      },
      { status: 401 }
    );
  }

  if (!title || !description || !image || !category || !pitch) {
    return NextResponse.json(
      {
        success: false,
        message: "All fields are required",
      },
      { status: 400 }
    );
  }

  let imageURL: string | undefined;
  try {
    // Convert image to a buffer
    const arrayBuffer = await image.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload image to Cloudinary
    imageURL = await new Promise<string>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "startup-hub" },
        (error, result) => {
          if (error) return reject(error);
          if (result && result.secure_url) resolve(result.secure_url);
          else reject(new Error("Failed to retrieve image URL"));
        }
      );

      uploadStream.end(buffer);
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to upload image to Cloudinary",
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }

  if (!imageURL) {
    return NextResponse.json(
      {
        success: false,
        message: "Image not uploaded",
      },
      { status: 400 }
    );
  }

  try {
    // Create post in the database
    const post: PostResponse = await prisma.post.create({
      data: {
        title,
        description,
        category,
        pitch,
        image: imageURL,
        user:{
          connect:{
            id:1
          }
        } // Adjust this if `user_id` should be dynamic
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Post created successfully",
        post,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to create post",
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
