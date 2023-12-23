import {
  TWebhookSubscriptionInvoiceResponse,
  WebhookSubscriptionInvoiceResponse,
} from "@/app/api/checkout/subscriptionInvoiceModel";
import {
  TWebhookSubscriptionResponse,
  WebhookSubscriptionResponse,
} from "@/app/api/checkout/subscriptionModel";
import {
  BASIC_MONTHLY_BOOSTS,
  BASIC_VARIANT_ID,
  PRO_MONTHLY_BOOSTS,
  PRO_VARIANT_ID,
  STANDARD_MONTHLY_BOOSTS,
  STANDARD_VARIANT_ID,
} from "@/constants/payments";
import crypto from "crypto";

export const validateDigestAndxSignature = (
  xSignature: string | null,
  digest: string,
) => {
  if (
    !xSignature ||
    !crypto.timingSafeEqual(
      Buffer.from(digest, "hex"),
      Buffer.from(xSignature, "hex"),
    )
  ) {
    throw new Error("Invalid signature while dycripting body.");
  }
};

const extractBodyfFromRequest = async (request: Request, secret: string) => {
  const rawBody = await request.text();
  if (!rawBody) {
    throw new Error("No body");
  }

  const xSignature = request.headers.get("X-Signature");

  const hmac = crypto.createHmac("sha256", secret);

  hmac.update(rawBody);
  const digest = hmac.digest("hex");

  validateDigestAndxSignature(xSignature, digest);

  return JSON.parse(rawBody);
};

export const extactSubscriptionFromRequest = async (
  request: Request,
  secret: string,
): Promise<TWebhookSubscriptionResponse> => {
  const body = await extractBodyfFromRequest(request, secret);
  return WebhookSubscriptionResponse.parse(body);
};

export const extactSubscriptionInvoiceFromRequest = async (
  request: Request,
  secret: string,
): Promise<TWebhookSubscriptionInvoiceResponse> => {
  const body = await extractBodyfFromRequest(request, secret);
  return WebhookSubscriptionInvoiceResponse.parse(body);
};

export const boostsToBeAdded = (variantId?: string) => {
  if (!variantId) return 0;
  switch (variantId) {
    case BASIC_VARIANT_ID:
      return BASIC_MONTHLY_BOOSTS;
    case STANDARD_VARIANT_ID:
      return STANDARD_MONTHLY_BOOSTS;
    case PRO_VARIANT_ID:
      return PRO_MONTHLY_BOOSTS;
    default:
      return 0;
  }
};
