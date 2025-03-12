import { isProduction } from "@/constants/payments";
import { detectBotServer } from "@/utils/botDetection";

var Mixpanel = require("mixpanel");

export class MixpanelBack {
  private static _instance: MixpanelBack;
  private mixpanelInstance: any;

  public static getInstance(): MixpanelBack {
    if (!MixpanelBack._instance) {
      MixpanelBack._instance = new MixpanelBack();
    }
    return MixpanelBack._instance;
  }

  private constructor() {
    if (MixpanelBack._instance) {
      throw new Error(
        "Error: Instantiation failed: Use MixpanelBack.getInstance() instead of new.",
      );
    }

    this.initializeMixpanel();
  }

  private initializeMixpanel(): void {
    try {
      this.mixpanelInstance = Mixpanel.init(
        process.env.NEXT_PUBLIC_MIXPANEL_ID || "",
        {
          debug: false,
          ignore_dnt: true,
          // Add IP anonymization for GDPR compliance
          ip: false,
          // Enable batching for better performance
          batch_size: 10,
          // Set a reasonable flush interval
          flush_interval: 10000,
        },
      );
    } catch (error) {
      console.error("Error initializing server-side Mixpanel:", error);
      // Create a dummy instance to prevent errors
      this.mixpanelInstance = {
        track: () => {},
        people: { set: () => {} },
      };
    }
  }

  /**
   * Track an event in Mixpanel
   * @param eventName The name of the event to track
   * @param data Additional properties to include with the event
   * @returns This instance for chaining
   */
  public track(eventName: string, data: object = {}): this {
    if (!isProduction) {
      return this;
    }

    try {
      // Detect if the request is from a bot
      const botInfo = detectBotServer();

      // Don't track events from bots that should be blocked
      if (botInfo.isBot && !botInfo.isAllowedBot) {
        return this;
      }

      // Merge bot detection properties with the provided data
      const mergedData = {
        ...data,
        ...botInfo.properties,
      };

      // Track the event
      this.mixpanelInstance.track(eventName, mergedData);
    } catch (error) {
      console.error("Error in server-side Mixpanel tracking:", error);

      // Attempt to track the event without bot detection
      try {
        this.mixpanelInstance.track(eventName, data);
      } catch (secondError) {
        console.error("Critical error in Mixpanel tracking:", secondError);
      }
    }

    return this;
  }

  /**
   * Set user properties in Mixpanel
   * @param userId The ID of the user
   * @param properties The properties to set
   * @returns This instance for chaining
   */
  public setUserProperties(userId: string, properties: object = {}): this {
    if (!isProduction) {
      return this;
    }

    try {
      this.mixpanelInstance.people.set(userId, properties);
    } catch (error) {
      console.error("Error setting Mixpanel user properties:", error);
    }

    return this;
  }
}
