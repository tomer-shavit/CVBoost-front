import { isProduction } from "@/constants/payments";

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

    this.mixpanelInstance = Mixpanel.init(
      process.env.NEXT_PUBLIC_MIXPANEL_ID || "",
      {
        debug: false,
        ignore_dnt: true,
      },
    );
  }

  public track(eventName: string, data: object = {}) {
    if (isProduction) {
      this.mixpanelInstance.track(eventName, data);
    }
    return this;
  }
}
