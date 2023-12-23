"use server";

import prisma from "@/prisma/client";
import { createHeaders, createRequestOptions } from "./httpRequests";
import {
  SLemonSqueezyRequest,
  TLemonSqueezyRequest,
} from "./zod-lemon-squeezy";
import { LS_API_BASE_URL } from "@/constants/payments";

export async function getProductVariants(
  productId: string,
): Promise<TLemonSqueezyRequest> {
  const lemonSqueezyApiKey = process.env.LEMON_SQUEEZY_API_KEY;

  if (!lemonSqueezyApiKey)
    throw new Error("No LEMON_SQUEEZY_API_KEY environment variable set");

  const url = `${LS_API_BASE_URL}/variants?filter[product_id]=${productId}`;
  const headers = createHeaders(lemonSqueezyApiKey);
  const requestOptions = createRequestOptions("GET", headers);

  const response: Response = await fetch(url, requestOptions);

  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

  const data = await response.json();

  const parsedData = SLemonSqueezyRequest.parse(data);

  return parsedData;
}

export async function cancelSubscription(userId: string): Promise<void> {
  const activeSubscription = await prisma.subscription.findFirst({
    where: { userId: userId, status: "active" },
  });
  if (!activeSubscription) return Promise.resolve();

  const lemonSqueezyApiKey = process.env.LEMON_SQUEEZY_API_KEY;

  if (!lemonSqueezyApiKey)
    throw new Error("No LEMON_SQUEEZY_API_KEY environment variable set");

  const url = `${LS_API_BASE_URL}/subscriptions/${activeSubscription.subscriptionId}`;
  const headers = createHeaders(lemonSqueezyApiKey);
  const requestOptions = createRequestOptions("DELETE", headers);
  const response: Response = await fetch(url, requestOptions);
  try {
    const responseData = await response.json();
    const subscriptionStatus = responseData.data.attributes.status;
    const isCancelled = responseData.data.attributes.cancelled;

    if (subscriptionStatus === "cancelled" && isCancelled) {
      console.log("Subscription is cancelled.");
    } else {
      throw new Error("Subscription is not cancelled.");
    }
  } catch (error) {
    console.log("error", error);
  }
}
