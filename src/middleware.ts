import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher(["/sign-in(.*)", "/unauthorized"]);

export default clerkMiddleware(
  async (auth, req) => {
    const { has } = await auth();
    if (!isPublicRoute(req)) {
      const isStaff = has({ permission: "org:access:editor" });
      if (!isStaff)
        return NextResponse.redirect(new URL("/unauthorized", req.url));
      await auth.protect();
    }
  },
  { debug: true },
);

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
