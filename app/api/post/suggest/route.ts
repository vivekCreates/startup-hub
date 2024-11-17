import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {

    const posts = await prisma.post.findMany({
        orderBy: {
            views: 'desc', // Sort by views in descending order
        },
        take: 2, // Limit the result to the first 2 posts
    });

    if (!posts) {
        return NextResponse.json({
            success: false,
            message: "post fetched successfully"
        }, { status: 401 })
    }
    return NextResponse.json({
        success: true,
        message: "post fetched successfully",
        posts
    }, { status: 200 })
}