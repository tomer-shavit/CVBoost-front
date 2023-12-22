import crypto from "crypto";
import { NextResponse } from "next/server";
import { WebhookSubscriptionResponse } from "../../subscriptionModel";
import prisma from "../../../../../prisma/client";
import { getServerSession } from "next-auth";

export async function POST(request: Request) {
  console.log("SUBSCRIPTION CREATED");
  const session = await getServerSession();
  console.log("SESSION", session);
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

  const parsedBody = WebhookSubscriptionResponse.parse(body);
  console.log("------------------------");
  console.log(parsedBody.meta.custom_data?.userId);
  try {
    const user = await prisma.user.findUnique({
      where: { id: parsedBody.meta.custom_data?.userId },
    });

    if (!user) {
      throw new Error("User not found");
    }
    const subscriptionData = parsedBody.data.attributes;
    // Create the subscription
    const subscription = await prisma.subscription.create({
      data: {
        lemonCustomerId: parsedBody.data.attributes.customer_id, // Assuming customer_id is a field in subscriptionData
        userId: parsedBody.meta.custom_data?.userId,
        userName: subscriptionData.user_name,
        userAddress: "someAddress", // Replace with actual data if available
        userCity: "someCity", // Replace with actual data if available
        userCountry: "someCountry", // Replace with actual data if available
        userZipCode: "someZipCode", // Replace with actual data if available
        productId: subscriptionData.product_id,
        productName: subscriptionData.product_name,
        varientId: subscriptionData.variant_id, // Check the field name in subscriptionData
        varientName: subscriptionData.variant_name,
        status: subscriptionData.status,
        refunded: subscriptionData.refunded,
        refundedAt: subscriptionData.refunded_at, // Convert to Date if not already
        totalUsd: parseFloat(subscriptionData.total_usd),
        taxUsd: parseFloat(subscriptionData.tax_usd),
        subtotalUsd: parseFloat(subscriptionData.subtotal_usd),
        sumUsd: parseFloat(subscriptionData.total_usd), // Assuming totalUsd is sumUsd
        billingAnchor: subscriptionData.billing_anchor, // Check the field name in subscriptionData
        UpdatePaymentMethodUrl: subscriptionData.update_payment_method_url, // Check the field name in subscriptionData
        CustomerPortalUrl: subscriptionData.customer_portal_url, // Check the field name in subscriptionData
      },
    });
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }

  return NextResponse.json({
    status: "ok",
  });
}
