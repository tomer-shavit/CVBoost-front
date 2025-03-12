import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getBotInfo, isBot } from "@/constants/bots";

/**
 * Middleware for analytics services like Mixpanel
 * Adds bot detection headers to the request
 */
export function middleware(request: NextRequest) {
  try {
    // Get the user agent from the request
    const userAgent = request.headers.get("user-agent");

    // Get detailed bot information
    const botInfo = getBotInfo(userAgent);

    // Clone the request headers to modify them
    const requestHeaders = new Headers(request.headers);

    // Add custom headers with bot detection information
    requestHeaders.set("x-is-bot", botInfo.isBot ? "true" : "false");

    // Add additional headers with more detailed information
    if (botInfo.isBot) {
      requestHeaders.set("x-bot-type", botInfo.botType || "unknown");
      requestHeaders.set(
        "x-bot-allowed",
        botInfo.isAllowedBot ? "true" : "false",
      );
    }

    // Continue with the modified request
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } catch (error) {
    // If detailed detection fails, fall back to basic detection
    console.error("Error in analytics middleware:", error);

    try {
      const userAgent = request.headers.get("user-agent");
      const botDetected = isBot(userAgent);

      // Clone the request headers to modify them
      const requestHeaders = new Headers(request.headers);

      // Add basic bot detection header
      requestHeaders.set("x-is-bot", botDetected ? "true" : "false");
      requestHeaders.set("x-bot-detection-error", "true");

      // Continue with the modified request
      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
    } catch (secondError) {
      // If everything fails, just continue without modification
      console.error("Critical error in analytics middleware:", secondError);
      return NextResponse.next();
    }
  }
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    // Only run on paths that might trigger analytics events
    // Exclude static files and API routes that don't need analytics
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|api/health).*)",
  ],
};
