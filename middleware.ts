import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  apiAuthPrefix,
  authRoutes,
  DEFAULT_LOGIN_REDIRECT,
  publicRoutes,
} from "./routes";

export async function middleware(request: NextRequest) {
  const { nextUrl } = request;

  console.log("Middleware running for path:", nextUrl.pathname);

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    return NextResponse.next();
  }

  // Check for both prefixed and non-prefixed versions of the cookie
  const authToken =
    request.cookies.get("__Secure-authjs.session-token")?.value ||
    request.cookies.get("authjs.session-token")?.value;

  const isLoggedIn = !!authToken;
  console.log("Is logged in:", isLoggedIn);

  if (isAuthRoute) {
    if (isLoggedIn) {
      console.log(
        "Redirecting to default login redirect:",
        DEFAULT_LOGIN_REDIRECT
      );
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return NextResponse.next();
  }

  if (!isLoggedIn && !isPublicRoute) {
    console.log("Redirecting to login page");
    return NextResponse.redirect(new URL("/login", nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
