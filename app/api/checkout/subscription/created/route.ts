import { NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";
import { extactSubscriptionFromRequest } from "@/helper/Payments/webhooks";
import { TWebhookSubscriptionResponse } from "../../subscriptionModel";
import { MixpanelBack } from "@/services/mixpanelBack";
import { SubscriptionsEvents } from "@/types/monitoring/subscriptions";
import { MontioringErrorTypes } from "@/types/monitoring/errors";

export async function POST(request: Request) {
  console.log("SUBSCRIPTION CREATED");
  const secret = process.env.LEMON_SQUEEZY_WEBHOOK_SECRET;
  try {
    if (!secret) {
      throw new Error("LEMON_SQUEEZY_SIGNING_SECRET is not set");
    }

    const parsedBody = await extactSubscriptionFromRequest(request, secret);

    if (!parsedBody.meta.custom_data?.userId) {
      throw new Error(
        "UserId not found in lemon squeezy subscription_created webhook",
      );
    }
    MixpanelBack.getInstance().track(SubscriptionsEvents.CREATED_START, {
      userId: parsedBody.meta.custom_data?.userId,
      subscription: parsedBody.data,
    });
    await validateUser(parsedBody);

    await createSubscription(parsedBody, parsedBody.meta.custom_data?.userId);

    MixpanelBack.getInstance().track(SubscriptionsEvents.CREATED_SUCCESS, {
      userId: parsedBody.meta.custom_data?.userId,
      subscription: parsedBody.data,
    });
  } catch (error) {
    MixpanelBack.getInstance().track(
      MontioringErrorTypes.CREATE_SUBSCRIPTION_ERROR,
      {
        error: error,
      },
    );
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    status: "ok",
    message: "Subscription created in the db",
  });
}

const validateUser = async (parsedBody: TWebhookSubscriptionResponse) => {
  const user = await prisma.user.findUnique({
    where: { id: parsedBody.meta.custom_data?.userId },
  });

  if (!user) {
    throw new Error("User not found in the DB while creating subscription.");
  }
};

const createSubscription = async (
  parsedBody: TWebhookSubscriptionResponse,
  userId: string,
) => {
  const subscriptionData = parsedBody.data.attributes;
  await prisma.subscription.create({
    data: {
      subscriptionId: parseInt(parsedBody.data.id),
      lemonCustomerId: subscriptionData.customer_id,
      userId: userId,
      userName: subscriptionData.user_name,
      productId: subscriptionData.product_id,
      productName: subscriptionData.product_name,
      variantId: subscriptionData.variant_id,
      varientName: subscriptionData.variant_name,
      status: subscriptionData.status,
      billingAnchor: subscriptionData.billing_anchor,
      createdAt: new Date(subscriptionData.created_at),
      updatedAt: new Date(subscriptionData.updated_at),
      updatePaymentMethodUrl: subscriptionData.urls.update_payment_method,
      customerPortalUrl: subscriptionData.urls.customer_portal,
    },
  });
};
