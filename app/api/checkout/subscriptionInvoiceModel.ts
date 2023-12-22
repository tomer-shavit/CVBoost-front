import { z } from "zod";

const linkSchema = z.object({
  self: z.string().url(),
  related: z.string().url().optional(),
});

const subscriptionInvoiceAttributesSchema = z.object({
  tax: z.number(),
  urls: z.object({
    invoice_url: z.string().url(),
  }),
  total: z.number(),
  status: z.string(),
  tax_usd: z.number(),
  currency: z.string(),
  refunded: z.boolean(),
  store_id: z.number(),
  subtotal: z.number(),
  test_mode: z.boolean(),
  total_usd: z.number(),
  user_name: z.string(),
  card_brand: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
  user_email: z.string(),
  customer_id: z.number(),
  refunded_at: z.null().optional(),
  subtotal_usd: z.number(),
  currency_rate: z.string(),
  tax_formatted: z.string(),
  billing_reason: z.string(),
  card_last_four: z.string(),
  discount_total: z.number(),
  subscription_id: z.number(),
  total_formatted: z.string(),
  status_formatted: z.string(),
  discount_total_usd: z.number(),
  subtotal_formatted: z.string(),
  discount_total_formatted: z.string(),
});

const subscriptionInvoiceRelationshipsSchema = z.object({
  store: z.object({ links: linkSchema }),
  customer: z.object({ links: linkSchema }),
  subscription: z.object({ links: linkSchema }),
});

const subscriptionInvoiceSchema = z.object({
  id: z.string(),
  type: z.literal("subscription-invoices"),
  links: linkSchema,
  attributes: subscriptionInvoiceAttributesSchema,
  relationships: subscriptionInvoiceRelationshipsSchema,
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

export const WebhookSubscriptionInvoiceResponse = z.object({
  data: subscriptionInvoiceSchema,
  meta: metaSchema,
});
