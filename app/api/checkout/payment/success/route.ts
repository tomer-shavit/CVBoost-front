import { NextResponse } from "next/server";
import {
  boostsToBeAdded,
  extactSubscriptionInvoiceFromRequest,
} from "@/helper/Payments/webhooks";
import prisma from "../../../../../prisma/client";
import { TWebhookSubscriptionInvoiceResponse } from "../../subscriptionInvoiceModel";
import { MixpanelBack } from "@/services/mixpanelBack";
import { SubscriptionsEvents } from "@/types/monitoring/subscriptions";

export async function POST(request: Request) {
  console.log("PAYMENT SUCCESSFUL");
  const secret = process.env.LEMON_SQUEEZY_WEBHOOK_SECRET;
  try {
    if (!secret) {
      throw new Error("LEMON_SQUEEZY_SIGNING_SECRET is not set");
    }

    const parsedBody = await extactSubscriptionInvoiceFromRequest(
      request,
      secret,
    );

    if (!parsedBody.meta.custom_data?.userId) {
      throw new Error(
        "UserId not found in lemon squeezy subscription_updated webhook",
      );
    }
    MixpanelBack.getInstance()
      .identify(parsedBody.meta.custom_data.userId)
      .track(SubscriptionsEvents.PAID_START, {
        userId: parsedBody.meta.custom_data?.userId,
        subscription: parsedBody.data,
      });
    validateCustomDataInParsedBody(parsedBody);

    const [totalBoosts, boostsAvailable] =
      await validateUserAndGetBoostsData(parsedBody);

    await createSubscriptionInvoice(
      parsedBody,
      parsedBody.meta.custom_data?.userId
        ? parsedBody.meta.custom_data?.userId
        : "",
    );
    await updateUserBoosts(parsedBody, totalBoosts, boostsAvailable);
    MixpanelBack.getInstance().track(SubscriptionsEvents.PAID_SUCCESS, {
      userId: parsedBody.meta.custom_data?.userId,
      subscription: parsedBody.data,
    });
  } catch (error) {
    MixpanelBack.getInstance().track(SubscriptionsEvents.PAID_FAIL, {
      error: error,
    });
    return NextResponse.json({ error: error.message });
  }

  return NextResponse.json({
    status: "ok",
    message: "Subscription Invoice created in the db, boosts updated",
  });
}

const updateUserBoosts = async (
  parsedBody: TWebhookSubscriptionInvoiceResponse,
  totalBoosts: number,
  boostsAvailable: number,
) => {
  const extraBoosts = boostsToBeAdded(parsedBody.meta.custom_data?.variantId);

  await prisma.user.update({
    where: { id: parsedBody.meta.custom_data?.userId },
    data: {
      resumeBoostsAvailable: boostsAvailable + extraBoosts,
      resumeBoostsTotal: totalBoosts + extraBoosts,
    },
  });
};

const validateUserAndGetBoostsData = async (
  parsedBody: TWebhookSubscriptionInvoiceResponse,
) => {
  const user = await prisma.user.findUnique({
    where: { id: parsedBody.meta.custom_data?.userId },
  });

  if (!user) {
    throw new Error(
      "User not found in the DB while creating subscription invoice.",
    );
  }
  return [user.resumeBoostsTotal, user.resumeBoostsAvailable];
};

const createSubscriptionInvoice = async (
  parsedBody: TWebhookSubscriptionInvoiceResponse,
  userId: string,
) => {
  const subscriptionInvoiceData = parsedBody.data.attributes;
  await prisma.subscriptionInvoice.create({
    data: {
      subscriptionInvoiceId: parseInt(parsedBody.data.id),
      subscriptionId: subscriptionInvoiceData.subscription_id,
      userId: userId,
      status: subscriptionInvoiceData.status,
      billingReason: subscriptionInvoiceData.billing_reason,
      totalUsd: subscriptionInvoiceData.total_usd,
      taxUsd: subscriptionInvoiceData.tax_usd,
      subtotalUsd: subscriptionInvoiceData.subtotal_usd,
      discountUsd: subscriptionInvoiceData.discount_total_usd,
      refunded: subscriptionInvoiceData.refunded,
      refundedAt: subscriptionInvoiceData.refunded_at
        ? new Date(subscriptionInvoiceData.refunded_at)
        : null,
      invoiceUrl: subscriptionInvoiceData.urls.invoice_url,
      storeUrl: parsedBody.data.relationships.store.links.self,
      subscriptionUrl: parsedBody.data.relationships.subscription.links.self,
      customerUrl: parsedBody.data.relationships.customer.links.self,
      createdAt: new Date(subscriptionInvoiceData.created_at),
      updatedAt: new Date(subscriptionInvoiceData.updated_at),
    },
  });
};

const validateCustomDataInParsedBody = (
  parsedBody: TWebhookSubscriptionInvoiceResponse,
) => {
  if (!parsedBody.meta.custom_data?.userId) {
    throw new Error(
      "UserId not found in lemon squeezy payment success webhook",
    );
  }
  if (!parsedBody.meta.custom_data?.variantId) {
    throw new Error(
      "VariantId not found in lemon squeezy payment success webhook",
    );
  }
};
