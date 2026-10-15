import type { CartItem, Product } from "../types/product";

export const BIKE30_CODE = "BIKE30";
export const BIKE30_PERCENT = 30;

export type CartTotals = {
  subtotalCents: number;
  deliveryCents: number;
  discountCents: number;
  totalCents: number;
  itemCount: number;
};

export function calculateCartTotals(
  items: readonly CartItem[],
  catalog: readonly Product[],
  appliedPromoCode: string | null,
): CartTotals {
  const prices = new Map(
    catalog.map((product) => [product.id, product.priceCents]),
  );
  const subtotalCents = items.reduce(
    (sum, item) => sum + (prices.get(item.productId) ?? 0) * item.quantity,
    0,
  );
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  // The supplied cart reference explicitly shows free delivery.
  const deliveryCents = 0;
  // Round the order-wide percentage once, in integer cents.
  const discountCents =
    appliedPromoCode === BIKE30_CODE
      ? Math.round((subtotalCents * BIKE30_PERCENT) / 100)
      : 0;
  return {
    subtotalCents,
    deliveryCents,
    discountCents,
    totalCents: subtotalCents + deliveryCents - discountCents,
    itemCount,
  };
}
