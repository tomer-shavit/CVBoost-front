"use client";
import { isProduction } from "@/constants/payments";
import mixpanel from "mixpanel-browser";
import { detectBotClient } from "@/utils/botDetectionClient";
import { shouldTrackEvent } from "@/utils/analytics";

export class MixpanelFront {
  private static _instance: MixpanelFront;
  private isBot: boolean = false;

  public static getInstance(): MixpanelFront {
    if (!MixpanelFront._instance) {
      MixpanelFront._instance = new MixpanelFront();
    }
    return MixpanelFront._instance;
  }

  public constructor() {
    if (MixpanelFront._instance) {
      throw new Error(
        "Error: Instantiation failed: Use MixpanelFront.getInstance() instead of new.",
      );
    }

    // Initialize Mixpanel with appropriate settings
    this.initializeMixpanel();

    // Setup bot detection
    this.setupBotDetection();
  }

  private initializeMixpanel(): void {
    try {
      mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL_ID || "", {
        debug: false,
        ignore_dnt: true,
        // Add IP anonymization for GDPR compliance
        ip: false,
        // Disable persistence for bots and crawlers
        persistence: "localStorage",
        // Disable automatic pageview tracking
        track_pageview: false,
        // Batch events for better performance
        batch_requests: true,
      });
    } catch (error) {
      // Error initializing Mixpanel
    }
  }

  private setupBotDetection(): void {
    try {
      const { isBot, userAgent, analyticsProperties } = detectBotClient();

      // Store bot status for later use
      this.isBot = isBot;

      // Register the analytics properties
      mixpanel.register(analyticsProperties);
    } catch (error) {
      // Error in Mixpanel bot detection
    }
  }

  public track(eventName: string, data: object = {}): this {
    // Only track events in production and if not a bot
    if (isProduction && typeof window !== "undefined") {
      try {
        // Get the user agent
        const userAgent = window.navigator.userAgent;

        // Check if we should track this event
        if (shouldTrackEvent(userAgent)) {
          mixpanel.track(eventName, data);
        }
      } catch (error) {
        // If there's an error, fall back to the stored bot status
        if (!this.isBot) {
          mixpanel.track(eventName, data);
        }
      }
    }
    return this;
  }

  public identify(userId: string): this {
    if (isProduction && !this.isBot) {
      try {
        mixpanel.identify(userId);
      } catch (error) {
        // Error in Mixpanel identify
      }
    }
    return this;
  }

  public reset(): this {
    if (isProduction) {
      try {
        mixpanel.reset();
      } catch (error) {
        // Error in Mixpanel reset
      }
    }
    return this;
  }
}
