import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export function middleware(request) {
    // Get the existing userid cookie
    const userid = request.cookies.get("userid");

    // If the userid cookie doesn't exist, create a new one
    if (!userid) {
        // Generate a new UUID
        const newUserId = uuidv4();

        // Clone the response
        const response = NextResponse.next();

        // Set the cookie with HTTP-only flag
        response.cookies.set({
            name: "userid",
            value: newUserId,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Only use HTTPS in production
            sameSite: "lax",
            path: "/",
        });

        return response;
    }

    return NextResponse.next();
}

// Configure which paths this middleware will run on
export const config = {
    matcher: [
        /*
         * Match all request paths except:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public folder
         */
        "/((?!_next/static|_next/image|favicon.ico|public/).*)",
    ],
};
