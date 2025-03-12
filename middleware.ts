import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isBot } from "@/constants/bots";

export function middleware(request: NextRequest) {
  // Get the user agent from the request
  const userAgent = request.headers.get("user-agent");

  // Check if the request is from a bot
  if (isBot(userAgent)) {
    // Return a 403 Forbidden response for bots
    return new NextResponse("Access Denied", {
      status: 403,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }

  // Allow the request to continue for non-bots
  return NextResponse.next();
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /_static (static files)
     * 4. /favicon.ico, /sitemap.xml, /robots.txt (common static files)
     */
    "/((?!api|_next|_static|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
