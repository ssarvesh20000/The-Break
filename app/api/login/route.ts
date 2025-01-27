import { NextResponse } from "next/server";
import { serialize } from "cookie";
require('dotenv').config();

// POST function to handle login given password
export async function POST(request: Request) {
    try {
        const password = (await request.json()).password;
        console.log("received password: ", password);

        if (password === process.env.ADMIN_PASSWORD) {
            // set cookie
            const cookie = serialize("authToken", "authenticated", {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: 60 * 60 * 24, // cookie lasts for 1 day than expires
                path: "/",
            });
            
            // send cookie in response for client to remember user is logged in
            return new NextResponse(
                JSON.stringify({ status: true }),
                {
                    status: 200,
                    headers: {
                    "Set-Cookie": cookie,
                    },
                }
            );
        } 
        else { 
            return NextResponse.json({ status: false}, { status: 401 });
        }
    } catch (error) {
        return NextResponse.json({ status: false}, { status: 500 });
    }
}

// GET function to check if user is logged in
export async function GET(request: Request) {
    const cookies = request.headers.get("cookie");

    if (cookies?.includes("authToken=authenticated")) {
        return NextResponse.json({ authenticated: true });
    }

    return NextResponse.json({ authenticated: false }, { status: 401 });
}