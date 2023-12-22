import crypto from "crypto";
import { NextResponse } from "next/server";
import { WebhookSubscriptionInvoiceResponse } from "../../subscriptionInvoiceModel";
// import { SubscriptionInvoiceSchemaLS } from "../../models";

export async function POST(request: Request) {
  console.log("------------------------");
  console.log("PAYMENT SUCCESSFUL");
  console.log("------------------------");
  const secret = process.env.LEMON_SQUEEZY_WEBHOOK_SECRET;

  if (!secret) {
    throw new Error("LEMON_SQUEEZY_SIGNING_SECRET is not set");
  }
  const rawBody = await request.text();

  if (!rawBody) {
    throw new Error("No body");
  }

  const xSignature = request.headers.get("X-Signature");

  const hmac = crypto.createHmac("sha256", secret);

  hmac.update(rawBody);
  const digest = hmac.digest("hex");

  if (
    !xSignature ||
    !crypto.timingSafeEqual(
      Buffer.from(digest, "hex"),
      Buffer.from(xSignature, "hex"),
    )
  ) {
    throw new Error("Invalid signature.");
  }

  const body = JSON.parse(rawBody);

  const parsedBody = WebhookSubscriptionInvoiceResponse.parse(body);
  console.log("------------------------");
  console.log("SUCCESS parsedBody", parsedBody);
  console.log("------------------------");
  return NextResponse.json({
    status: "ok",
  });
}
