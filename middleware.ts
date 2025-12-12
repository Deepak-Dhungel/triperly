import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const sessionCookie = request.cookies.get("session")?.value;

  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    const loginURL = new URL("/login", request.url);

    // if session cookie is not present, redirect to login
    if (!sessionCookie) {
      return NextResponse.redirect(loginURL);
    }

    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/dashboard", "/dashboard/:path*"],
};
