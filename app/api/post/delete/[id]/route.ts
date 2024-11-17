import prisma from "@/lib/db";
import { NextResponse } from "next/server";



export async function DELETE(request: NextResponse) {

    try {
        const url = new URL(request.url);
        const id = Number(url.pathname.split("/").pop());

        const post = await prisma.post.delete({ where: { id } })
        if (!post) {
            return NextResponse.json({
                success: false,
                msg: "post deos not exist",

            }, { status: 405 })
        }

        return NextResponse.json({
            success: true,
            msg: "post deleted successfully",
            post
        }, { status: 200 })
    } catch (error: any) {
        console.log("while went wrong while deleting the post")
        return NextResponse.json({
            success: false,
            msg: "post not deleted",
        }, { status: 400 })

    }

}
