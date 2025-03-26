/**
 * Shared analytics utilities for handling bot traffic
 * This can be used by any analytics service (Mixpanel, Google Analytics, etc.)
 */

import { getBotInfo, isBot } from "@/constants/bots";

/**
 * Prepares event properties for analytics, handling bot detection
 * @param properties Original event properties
 * @param userAgent User agent string
 * @returns Enhanced properties with bot detection
 */
export function prepareAnalyticsProperties(
  properties: Record<string, any> = {},
  userAgent: string,
): Record<string, any> {
  try {
    // Get detailed bot information
    const botInfo = getBotInfo(userAgent);

    return {
      ...properties,
      // Add the $ignore property if it's a bot that should be blocked
      ...(botInfo.isBot && !botInfo.isAllowedBot ? { $ignore: true } : {}),
      // Always include the user agent for debugging
      "User Agent": userAgent,
      // Add bot detection info
      "Bot Detection": botInfo.isBot ? "detected" : "none",
      // Add detailed bot info if it's a bot
      ...(botInfo.isBot
        ? {
            "Bot Type": botInfo.botType,
            "Bot Pattern": botInfo.matchedPattern,
            "Bot Allowed": botInfo.isAllowedBot,
          }
        : {}),
    };
  } catch (error) {
    // Fallback to basic detection if detailed detection fails
    const botDetected = isBot(userAgent);

    return {
      ...properties,
      // Add the $ignore property if it's a bot
      ...(botDetected ? { $ignore: true } : {}),
      // Always include the user agent for debugging
      "User Agent": userAgent,
      // Add bot detection info
      "Bot Detection": botDetected ? "detected" : "none",
      "Bot Detection Error": true,
    };
  }
}

/**
 * Checks if an event should be tracked based on bot status
 * @param userAgent User agent string
 * @returns Whether the event should be tracked
 */
export function shouldTrackEvent(userAgent: string): boolean {
  try {
    const botInfo = getBotInfo(userAgent);

    // Track events from allowed bots (like search engines) but not from other bots
    return !botInfo.isBot || botInfo.isAllowedBot;
  } catch (error) {
    // Fallback to basic detection if detailed detection fails
    return !isBot(userAgent);
  }
}
