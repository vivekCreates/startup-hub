import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const url = new URL(request.url);
    const id = Number(url.pathname.split("/").pop());

    if (isNaN(id)) {
        return NextResponse.json({
            success: false,
            message: "Invalid post ID"
        }, {
            status: 400
        });
    }

    console.log("id", id);
    try {
        const post = await prisma.post.update({
            where: {
                id, // Ensure `id` is defined correctly
            },
            data: {
                views: {
                    increment: 1, // Increment the `views` field by 1
                },
            },
        });

        if (!post) {
            return NextResponse.json({
                success: false,
                message: "Post does not exist"
            }, {
                status: 404
            });
        }

        return NextResponse.json({
            success: true,
            message: "Post updated successfully",
            post
        }, {
            status: 200
        });
    } catch (error:any) {
        console.error("Error updating post:", error);
        return NextResponse.json({
            success: false,
            message: "Internal server error"
        }, {
            status: 500
        });
    }
}
