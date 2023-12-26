export const isProduction = process.env.NODE_ENV === "production";

export const MAIN_PRODUCT_ID = isProduction ? "155119" : "151810";

export const BASIC_PRODCUT_ID = isProduction
  ? "139ce358-28c4-45f1-a62f-018039d881cd"
  : "1d104fa1-108c-41e5-8ebf-18179a53a9ee";
export const BASIC_VARIANT_ID = isProduction ? "193033" : "187368";
export const BASIC_MONTHLY_BOOSTS = 5;
export const STANDARD_PRODUCT_ID = isProduction
  ? "786d83d9-664d-4b0f-977e-41b47b495c9b"
  : "f3aaae9e-5abc-4f6c-b8e3-4ff71ef685e7";
export const STANDARD_VARIANT_ID = isProduction ? "193034" : "187369";
export const STANDARD_MONTHLY_BOOSTS = 10;
export const PRO_PRODUCT_ID = isProduction
  ? "21989369-eae4-490f-86ab-cd07e7568179"
  : "7b3baf33-b2d7-4bd0-a788-d6f6f0c8b7df";
export const PRO_VARIANT_ID = isProduction ? "193035" : "187371";
export const PRO_MONTHLY_BOOSTS = 20;
export const LS_API_BASE_URL = "https://api.lemonsqueezy.com/v1";
