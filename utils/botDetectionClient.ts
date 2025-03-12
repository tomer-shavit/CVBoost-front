"use client";

import { isBot } from "@/constants/bots";
import { prepareAnalyticsProperties } from "./analytics";

/**
 * Client-side bot detection
 * @returns Whether the current user is a bot and analytics properties
 */
export function detectBotClient(): {
  isBot: boolean;
  userAgent: string;
  analyticsProperties: Record<string, any>;
} {
  if (typeof window === "undefined" || !window.navigator) {
    return {
      isBot: false,
      userAgent: "",
      analyticsProperties: {},
    };
  }

  try {
    const userAgent = window.navigator.userAgent;
    const botDetected = isBot(userAgent);

    return {
      isBot: botDetected,
      userAgent,
      analyticsProperties: prepareAnalyticsProperties({}, userAgent),
    };
  } catch (error) {
    console.error("Error in client-side bot detection:", error);
    return {
      isBot: false,
      userAgent: "",
      analyticsProperties: {},
    };
  }
}
