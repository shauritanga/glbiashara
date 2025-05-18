import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  apiAuthPrrefix,
  authRoutes,
  DEFAULT_LOGIN_REDIRECT,
  publicRoutes,
} from "./routes";

export function isPublicRoute(pathname: string): boolean {
  console.log("Checking public route:", pathname);
  return publicRoutes.some(
    (route) =>
      route === pathname ||
      (route === "/clubs" && pathname.startsWith("/clubs")) ||
      (route === "/schools" && pathname.startsWith("/schools")) ||
      (route === "/business" && pathname.startsWith("/business")) ||
      (route === "/tourism" && pathname.startsWith("/tourism")) ||
      (route === "/breweries" && pathname.startsWith("/breweries")) ||
      (route === "/vodacom" && pathname.startsWith("/vodacom")) ||
      (route === "/companies" && pathname.startsWith("/companies"))
  );
}

export async function middleware(request: NextRequest) {
  const { nextUrl } = request;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrrefix);
  const publicRoute = isPublicRoute(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    return NextResponse.next();
  }

  // Check for both prefixed and non-prefixed versions of the cookie
  const authToken =
    request.cookies.get("__Secure-authjs.session-token")?.value ||
    request.cookies.get("authjs.session-token")?.value;

  const isLoggedIn = !!authToken;

  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return NextResponse.next();
  }

  if (!isLoggedIn && !publicRoute) {
    return NextResponse.redirect(new URL("/login", nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
