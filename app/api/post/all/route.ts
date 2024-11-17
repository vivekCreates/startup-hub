import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request:NextRequest) {
    
  const posts =  await prisma.post.findMany({include:{user:
    {
      select: {
        id: true,
        name: true,
        avatar:true
      },
    }
  }});

  if (!posts) {
    return NextResponse.json({
        success:false,
        message:"cannot fetched posts."
    },{status:400})
  }
  return NextResponse.json({
    success:true,
    message:"posts fetched successfully",
    posts
},{status:200})
}