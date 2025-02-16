import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// middleware function runs before every api request
export function middleware(req: NextRequest) {
    const cookies = req.headers.get("cookie");

    if (cookies?.includes("authToken=authenticated")) {
        return NextResponse.next();
    }

    return NextResponse.redirect(new URL('login', req.url));
}

// Define which paths to protect
export const config = {
    matcher: [
        '/api/admin/:path*',
        '/pages/admin/:path*',
        '/pages/modify/:path*',
        '/pages/mediaChange/:path*',
        '/pages/blogChange/:path*',
    ], 
    // TOOD add more pages that need to be protected that are clickable from admin page if i missed any
};
