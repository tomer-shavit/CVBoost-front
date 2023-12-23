import {
  BASIC_PRODCUT_ID,
  BASIC_VARIANT_ID,
  PRO_PRODUCT_ID,
  PRO_VARIANT_ID,
  STANDARD_PRODUCT_ID,
  STANDARD_VARIANT_ID,
} from "@/constants/payments";

export const getProductIdByVarientId = (variantId: string): string => {
  if (variantId === BASIC_VARIANT_ID) {
    return BASIC_PRODCUT_ID;
  } else if (variantId === STANDARD_VARIANT_ID) {
    return STANDARD_PRODUCT_ID;
  } else if (variantId === PRO_VARIANT_ID) {
    return PRO_PRODUCT_ID;
  }
  return "";
};
