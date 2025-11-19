import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    const sessionCookie = request.cookies.get("session")?.value;

    // if there is no cookie, redirect to login page
    if (!sessionCookie) {
      const loginURL = new URL("/login", request.url);
      return NextResponse.redirect(loginURL);
    }

    // if cookie exists
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/dashboard", "/dashboard/:path*"],
};
