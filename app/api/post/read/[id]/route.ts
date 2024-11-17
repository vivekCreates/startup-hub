import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: NextResponse) {

    try {
        const url = new URL(request.url);
        const id = Number(url.pathname.split("/").pop());

        const post = await prisma.post.findUnique({ where: { id } })
        if (!post) {
            return NextResponse.json({
                success: false,
                msg: "post does not exist",

            }, { status: 400 })
        }

        return NextResponse.json({
            success: true,
            msg: "post fetched successfully",
            post
        }, { status: 200 })
    } catch (error: any) {
        console.log("while went wrong while fetching the post")
        
        return NextResponse.json({
            success: false,
            msg: "post does not exist",

        }, { status: 400 })

    }

}

