"use client";
import { isProduction } from "@/constants/payments";
import mixpanel from "mixpanel-browser";

export class MixpanelFront {
  private static _instance: MixpanelFront;

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

    mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL_ID || "", {
      debug: false,
      ignore_dnt: true,
    });
  }

  public track(eventName: string, data: object = {}) {
    if (isProduction) {
      mixpanel.track(eventName, data);
    }
    return this;
  }

  public identify(userId: string) {
    if (isProduction) {
      mixpanel.identify(userId);
    }
    return this;
  }
}
