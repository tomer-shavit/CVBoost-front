import { NextResponse } from "next/server";
import { TWebhookSubscriptionResponse } from "../../subscriptionModel";
import prisma from "@/prisma/client";
import { extactSubscriptionFromRequest } from "@/helper/Payments/webhooks";
import { MixpanelBack } from "@/services/mixpanelBack";
import { SubscriptionsEvents } from "@/types/monitoring/subscriptions";
import { MontioringErrorTypes } from "@/types/monitoring/errors";

export async function POST(request: Request) {
  console.log("------------------------");
  console.log("SUBSCRIPTION UPDATED");
  console.log("------------------------");
  const secret = process.env.LEMON_SQUEEZY_WEBHOOK_SECRET;
  try {
    if (!secret) {
      throw new Error("LEMON_SQUEEZY_SIGNING_SECRET is not set");
    }

    const parsedBody = await extactSubscriptionFromRequest(request, secret);

    if (!parsedBody.meta.custom_data?.userId) {
      throw new Error(
        "UserId not found in lemon squeezy subscription_updated webhook",
      );
    }
    await validateUser(parsedBody);
    MixpanelBack.getInstance().track(SubscriptionsEvents.UPDATED_START, {
      userId: parsedBody.meta.custom_data?.userId,
      subscription: parsedBody.data,
    });

    const doesExsist = await isSubscriptionExist(parsedBody);

    if (!doesExsist) {
      return NextResponse.json({
        status: "ok",
        message: "Subscription doesn't exist in the db yet.",
      });
    }

    await updateSubscription(parsedBody, parsedBody.meta.custom_data?.userId);

    if (parsedBody.data.attributes.status === "unpaid") {
      await handleUnpaidSubscription(parsedBody);
    }

    MixpanelBack.getInstance().track(SubscriptionsEvents.UPDATED_SUCCESS, {
      userId: parsedBody.meta.custom_data?.userId,
      subscription: parsedBody.data,
    });
  } catch (error) {
    MixpanelBack.getInstance().track(
      MontioringErrorTypes.UPDATE_SUBSCRIPTION_ERROR,
      {
        error: error,
      },
    );
    return NextResponse.json({ error: error.message });
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

const isSubscriptionExist = async (
  parsedBody: TWebhookSubscriptionResponse,
): Promise<boolean> => {
  const subscription = await prisma.subscription.findUnique({
    where: { subscriptionId: parseInt(parsedBody.data.id) },
  });

  return subscription ? true : false;
};

const updateSubscription = async (
  parsedBody: TWebhookSubscriptionResponse,
  userId: string,
) => {
  const subscriptionData = parsedBody.data.attributes;
  await prisma.subscription.update({
    where: { subscriptionId: parseInt(parsedBody.data.id) },
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

const handleUnpaidSubscription = async (
  parsedBody: TWebhookSubscriptionResponse,
) => {
  const user = await prisma.user.update({
    where: { id: parsedBody.meta.custom_data?.userId },
    data: { resumeBoostsAvailable: 0 },
  });
  MixpanelBack.getInstance().track(SubscriptionsEvents.UNPAID_SUCCESS, {
    user: user,
  });
};
