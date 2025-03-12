/**
 * Bot detection constants and utilities
 *
 * This file contains patterns for detecting bots and crawlers
 * based on their user agent strings.
 */

/**
 * List of bot user agent patterns to detect
 * Organized by category for better maintainability
 */
const SEARCH_ENGINE_BOTS = [
  /googlebot/i,
  /bingbot/i,
  /yandexbot/i,
  /baiduspider/i,
  /slurp/i, // Yahoo
  /duckduckbot/i,
  /semrushbot/i,
  /exabot/i,
  /sogou/i,
];

const SOCIAL_MEDIA_BOTS = [
  /facebookexternalhit/i,
  /twitterbot/i,
  /linkedinbot/i,
  /whatsapp/i,
  /telegrambot/i,
  /pinterestbot/i,
];

const TOOL_BOTS = [
  /headless/i,
  /selenium/i,
  /puppeteer/i,
  /phantomjs/i,
  /chrome-lighthouse/i,
  /pingdom/i,
  /pagespeed/i,
  /gtmetrix/i,
  /ahrefsbot/i,
  /mj12bot/i,
  /dotbot/i,
  /rogerbot/i,
];

const GENERIC_BOT_PATTERNS = [
  /bot/i,
  /spider/i,
  /crawl/i,
  /scrape/i,
  /phantom/i,
  /Mozilla\/4\.0/i, // GTM bots and older browsers
  /crawler/i,
  /archiver/i,
  /validator/i,
];

/**
 * Combined list of all bot patterns to check against
 */
export const BOT_UA_PATTERNS = [
  ...GENERIC_BOT_PATTERNS,
  ...TOOL_BOTS,
  ...SOCIAL_MEDIA_BOTS,
];

/**
 * List of allowed bot user agents (e.g., search engines)
 * These bots are allowed to access the site
 */
export const ALLOWED_BOTS = SEARCH_ENGINE_BOTS;

/**
 * Function to check if a user agent is a bot
 * @param userAgent The user agent string to check
 * @returns True if the user agent is a bot that should be blocked, false otherwise
 */
export function isBot(userAgent: string | null): boolean {
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

/**
 * Function to get detailed information about a bot
 * Useful for logging and debugging
 * @param userAgent The user agent string to check
 * @returns Object with bot detection details
 */
export function getBotInfo(userAgent: string | null): {
  isBot: boolean;
  isAllowedBot: boolean;
  botType: string | null;
  matchedPattern: string | null;
} {
  if (!userAgent) {
    return {
      isBot: false,
      isAllowedBot: false,
      botType: null,
      matchedPattern: null,
    };
  }

  // Check if it's an allowed bot
  for (const pattern of ALLOWED_BOTS) {
    if (pattern.test(userAgent)) {
      return {
        isBot: true,
        isAllowedBot: true,
        botType: "search_engine",
        matchedPattern: pattern.toString(),
      };
    }
  }

  // Check social media bots
  for (const pattern of SOCIAL_MEDIA_BOTS) {
    if (pattern.test(userAgent)) {
      return {
        isBot: true,
        isAllowedBot: false,
        botType: "social_media",
        matchedPattern: pattern.toString(),
      };
    }
  }

  // Check tool bots
  for (const pattern of TOOL_BOTS) {
    if (pattern.test(userAgent)) {
      return {
        isBot: true,
        isAllowedBot: false,
        botType: "tool",
        matchedPattern: pattern.toString(),
      };
    }
  }

  // Check generic bot patterns
  for (const pattern of GENERIC_BOT_PATTERNS) {
    if (pattern.test(userAgent)) {
      return {
        isBot: true,
        isAllowedBot: false,
        botType: "generic",
        matchedPattern: pattern.toString(),
      };
    }
  }

  return {
    isBot: false,
    isAllowedBot: false,
    botType: null,
    matchedPattern: null,
  };
}
