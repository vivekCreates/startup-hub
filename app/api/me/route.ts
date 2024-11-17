import { auth } from "@/auth";
import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";


export  async function GET(request: NextRequest) {
    const session = await auth();

    const userId = session?.user.id as string;

  
    const user = await prisma.user.findUnique({
        where: {
            id:Number(userId),
        },
        include: {
            posts: true,  // Include posts related to the user
        }
    });

    // If no user is found, return an error message
    if (!user) {
        return NextResponse.json(
            {
                success: false,
                message: "User not found",
            },
            { status: 404 }
        );
    }

    // Return user data if successful
    return NextResponse.json(
        {
            success: true,
            message: "User fetched successfully",
            user,
        },
        { status: 200 }
    );
}
