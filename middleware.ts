import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // get refresh token from cookies
  const refreshToken = request.cookies.get("refreshToken")?.value;

  // check if the user is in the dashboard or not
  const isDashboardRoute = request.nextUrl.pathname.startsWith("/dashboard");

  console.log("Middleware running on:", request.nextUrl.pathname);
  console.log("Refresh token exists:", !!refreshToken);

  // if the user is in the dashboard and don't have a refresh token
  if (isDashboardRoute && !refreshToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // if everything is fine continue to the next request
  return NextResponse.next();
}

// apply middleware only on dashboard routes
export const config = {
  matcher: ["/dashboard/:path*"],
};