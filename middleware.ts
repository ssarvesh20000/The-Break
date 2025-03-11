import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// middleware function runs before every api request
export function middleware(req: NextRequest) {
    const cookies = req.headers.get("cookie");

    // if authenticated, continue with normal request
    if (cookies?.includes("authToken=authenticated")) {
        return NextResponse.next();
    }

    // Check if the request is for an API route
    if (req.nextUrl.pathname.startsWith('/api/')) {
        return new NextResponse(
            JSON.stringify({ message: "Unauthenticated access" }),
            { status: 401 }
        );
    }
    // if request is to a protected page, redirect to login page
    return NextResponse.redirect(new URL('/pages/login', req.url));
}

// Define which paths to protect
export const config = {
    matcher: [
        // api routes
        '/api/admin/:path*',
        '/api/media/:path*',
        // page routes
        '/pages/admin/:path*',
        '/pages/modify/:path*',
        '/pages/mediaChange/:path*',
        '/pages/blogChange/:path*',
        '/pages/write/:path*',
        '/pages/media/:path*',
    ], 
    // TODO sarvy, add more pages that need to be protected that are clickable from admin page if i missed any
};
