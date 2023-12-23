import { z } from "zod";

const linkSchema = z.object({
  self: z.string().url(),
  related: z.string().url().optional(),
});

const subscriptionItemSchema = z.object({
  id: z.number(),
  price_id: z.number(),
  quantity: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
  is_usage_based: z.boolean(),
  subscription_id: z.number(),
});

const subscriptionAttributesSchema = z.object({
  urls: z.object({
    customer_portal: z.string().url(),
    update_payment_method: z.string().url(),
  }),
  pause: z.null().optional(),
  status: z.string(),
  ends_at: z.null().optional(),
  order_id: z.number(),
  store_id: z.number(),
  cancelled: z.boolean(),
  renews_at: z.string(),
  test_mode: z.boolean(),
  user_name: z.string(),
  card_brand: z.string(),
  created_at: z.string(),
  product_id: z.number(),
  updated_at: z.string(),
  user_email: z.string(),
  variant_id: z.number(),
  customer_id: z.number(),
  product_name: z.string(),
  variant_name: z.string(),
  order_item_id: z.number(),
  trial_ends_at: z.null().optional(),
  billing_anchor: z.number(),
  card_last_four: z.string(),
  status_formatted: z.string(),
  first_subscription_item: subscriptionItemSchema,
});

const subscriptionRelationshipsSchema = z.object({
  order: z.object({ links: linkSchema }),
  store: z.object({ links: linkSchema }),
  product: z.object({ links: linkSchema }),
  variant: z.object({ links: linkSchema }),
  customer: z.object({ links: linkSchema }),
  "order-item": z.object({ links: linkSchema }),
  "subscription-items": z.object({ links: linkSchema }),
  "subscription-invoices": z.object({ links: linkSchema }),
});

const subscriptionSchema = z.object({
  id: z.string(),
  type: z.literal("subscriptions"),
  links: linkSchema,
  attributes: subscriptionAttributesSchema,
  relationships: subscriptionRelationshipsSchema,
});

const metaSchema = z.object({
  test_mode: z.boolean(),
  event_name: z.string(),
  webhook_id: z.string(),
  custom_data: z
    .object({
      userId: z.string(),
    })
    .optional(),
});

export const WebhookSubscriptionResponse = z.object({
  data: subscriptionSchema,
  meta: metaSchema,
});

export type TWebhookSubscriptionResponse = z.infer<
  typeof WebhookSubscriptionResponse
>;
