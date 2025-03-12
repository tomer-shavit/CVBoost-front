import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// List of bot user agent patterns to block
const BOT_UA_PATTERNS = [
  /bot/i,
  /spider/i,
  /crawl/i,
  /scrape/i,
  /headless/i,
  /selenium/i,
  /puppeteer/i,
  /chrome-lighthouse/i,
  /slurp/i,
  /facebook/i,
  /pingdom/i,
  /phantom/i,
  /ahrefsbot/i,
  /semrushbot/i,
  /bingbot/i,
  /baiduspider/i,
  /yandexbot/i,
];

// List of allowed bot user agents (e.g., Google, Bing)
const ALLOWED_BOTS = [/googlebot/i, /bingbot/i, /yandexbot/i];

// Function to check if a user agent is a bot
function isBot(userAgent: string | null): boolean {
  if (!userAgent) return false;

  // Check if it's an allowed bot
  for (const pattern of ALLOWED_BOTS) {
    if (pattern.test(userAgent)) {
      return false;
    }
  }

  // Check if it's a bot to block
  for (const pattern of BOT_UA_PATTERNS) {
    if (pattern.test(userAgent)) {
      return true;
    }
  }

  return false;
}

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
