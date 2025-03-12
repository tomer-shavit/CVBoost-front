import { getBotInfo, isBot } from "@/constants/bots";
import { headers } from "next/headers";
import { prepareAnalyticsProperties } from "./analytics";

/**
 * Server-side bot detection
 * @returns An object with isBot flag and properties to add to analytics events
 */
export function detectBotServer(): {
  isBot: boolean;
  isAllowedBot: boolean;
  botType: string | null;
  properties: Record<string, any>;
} {
  try {
    const headersList = headers();
    const userAgent = headersList.get("user-agent") || "";

    // First check if the middleware has already detected a bot
    const isBotHeader = headersList.get("x-is-bot");

    if (isBotHeader === "true") {
      // If middleware detected a bot, use that information
      return {
        isBot: true,
        isAllowedBot: false,
        botType: "middleware_detected",
        properties: prepareAnalyticsProperties(
          { "Bot Detection": "middleware" },
          userAgent,
        ),
      };
    }

    // If middleware didn't detect a bot or header is not present,
    // perform our own detection
    const botInfo = getBotInfo(userAgent);

    return {
      isBot: botInfo.isBot,
      isAllowedBot: botInfo.isAllowedBot,
      botType: botInfo.botType,
      properties: prepareAnalyticsProperties(
        {
          "Bot Detection": botInfo.isBot ? "server" : "none",
          "Bot Type": botInfo.botType,
        },
        userAgent,
      ),
    };
  } catch (error) {
    // Fallback to basic detection if detailed detection fails
    console.error("Error in server-side bot detection:", error);

    try {
      const headersList = headers();
      const userAgent = headersList.get("user-agent") || "";
      const botDetected = isBot(userAgent);

      return {
        isBot: botDetected,
        isAllowedBot: false,
        botType: botDetected ? "fallback_detection" : null,
        properties: {
          $ignore: botDetected,
          "User Agent": userAgent,
          "Bot Detection": botDetected ? "fallback" : "none",
          "Bot Detection Error": true,
        },
      };
    } catch (secondError) {
      // If everything fails, return safe defaults
      console.error("Critical error in bot detection:", secondError);
      return {
        isBot: false,
        isAllowedBot: false,
        botType: null,
        properties: {
          "Bot Detection": "error",
          "Bot Detection Error": true,
        },
      };
    }
  }
}
