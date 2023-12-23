import { env } from "process";
import { getProductIdByVarientId } from "./mapping";

export function splitNumber(value: number): [number, number] {
  const stringValue = value.toString();
  const middle = stringValue.length - 2;
  const firstPart = parseInt(stringValue.substring(0, middle));
  const secondPart = parseInt(stringValue.substring(middle));
  return [firstPart, secondPart];
}

export function extractFeatureData(htmlString: string): string[] {
  const parser = new DOMParser();

  // Parse the HTML string
  const doc = parser.parseFromString(htmlString, "text/html");

  // Extract the text content from each <li> element
  const listItems = Array.from(doc.querySelectorAll("li"));
  const extractedData = listItems.map((li) => li.textContent?.trim() || "");

  return extractedData;
}

export function createCheckoutLink(
  variantId: string,
  email?: string | null,
  userId?: string | null,
) {
  let productId = getProductIdByVarientId(variantId);
  let url = new URL(`https://shop.cvboost.ai/checkout/buy/${productId}`);
  url.searchParams.set("enabled", variantId);
  if (userId) {
    url.searchParams.set("checkout[custom][userId]", userId);
  }
  if (email) {
    url.searchParams.set("checkout[email]", email);
  }
  url.searchParams.set("checkout[custom][variantId]", variantId);

  console.log("url", url.toString());
  return url.toString();
}
