import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  apiAuthPrrefix,
  authRoutes,
  DEFAULT_LOGIN_REDIRECT,
  publicRoutes,
} from "./routes";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const { nextUrl } = request;

  console.log(request.cookies);

  const isLoggedIn = request.cookies.has("authjs.session-token");

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    return NextResponse.next();
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return NextResponse.next();
  }
  if (!isLoggedIn && !isPublicRoute) {
    return NextResponse.redirect(new URL("/login", nextUrl));
  }
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
