import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./auth";

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const isPublicPath = path === '/sign-in' || path === '/sign-up';
    const session = await auth();
    
    if (isPublicPath && session) {
        return NextResponse.redirect(new URL('/', request.url));
    }
    
    if (!isPublicPath && !session) {
        return NextResponse.redirect(new URL('/sign-in', request.url));
    }
}

export const config = {
    matcher: [
        '/',
        '/sign-in',
        '/sign-up',
        '/post/:path*',
        '/profile'
    ]
};
