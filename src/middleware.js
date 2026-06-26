import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// ─── Route Matchers ───────────────────────────────────────────────────────────
const isAdminRoute = createRouteMatcher(["/dashboard/admin(.*)"]);
const isManagerRoute = createRouteMatcher(["/dashboard/manager(.*)"]);
const isDashboard = createRouteMatcher(["/dashboard(.*)"]);
const isPublicRoute = createRouteMatcher([
  "/",
  "/about",
  "/courses(.*)",
  "/contact",
  "/sign-in(.*)",
  "/sign-up(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  // Allow public routes through without any check
  if (isPublicRoute(req)) return NextResponse.next();

  // For all dashboard routes, require authentication first
  if (isDashboard(req)) {
    const { userId, sessionClaims } = await auth();

    // Not signed in → redirect to sign-in
    if (!userId) {
      const signInUrl = new URL("/sign-in", req.url);
      signInUrl.searchParams.set("redirect_url", req.url);
      return NextResponse.redirect(signInUrl);
    }

    // Extract role from session claims (set via Clerk's publicMetadata)
    // Falls back to 'user' if no role is set
    const role = sessionClaims?.metadata?.role ?? "user";

    // /dashboard/admin/* → admin only
    if (isAdminRoute(req) && role !== "admin") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    // /dashboard/manager/* → admin or manager only
    if (isManagerRoute(req) && role !== "admin" && role !== "manager") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for Clerk's auto-proxy path
    "/__clerk/:path*",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
