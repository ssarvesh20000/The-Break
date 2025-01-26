import { serialize } from "cookie";
import { NextResponse } from "next/server";

// POST function to handle logout given cookie
export async function POST() {
    const cookie = serialize("authToken", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 0, // Expire the cookie immediately
        path: "/",
    });

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