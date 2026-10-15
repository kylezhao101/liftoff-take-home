import { create } from "zustand";

import { getProduct, products } from "../config/products";
import type { CartItem, ProductId } from "../types/product";
import { BIKE30_CODE } from "../utils/cart";

type ShopState = {
  favoriteIds: ProductId[];
  toggleFavorite: (id: ProductId) => void;
  cartItems: CartItem[];
  addToCart: (id: ProductId) => void;
  setQuantity: (id: ProductId, quantity: number) => void;
  appliedPromoCode: string | null;
  applyPromoCode: (code: string) => boolean;
};

export const useShopStore = create<ShopState>()((set) => ({
  favoriteIds: products
    .filter((product) => product.initiallyFavorite)
    .map((product) => product.id),
  cartItems: [...products]
    .sort((a, b) => (a.initialCartOrder ?? 0) - (b.initialCartOrder ?? 0))
    .flatMap((product) =>
      product.initialCartQuantity
        ? [{ productId: product.id, quantity: product.initialCartQuantity }]
        : [],
    ),
  appliedPromoCode: BIKE30_CODE,
  addToCart: (id) =>
    set((state) => {
      if (!getProduct(id)) return state;
      const existing = state.cartItems.find((item) => item.productId === id);
      return {
        cartItems: existing
          ? state.cartItems.map((item) =>
              item.productId === id
                ? { ...item, quantity: item.quantity + 1 }
                : item,
            )
          : [...state.cartItems, { productId: id, quantity: 1 }],
      };
    }),
  setQuantity: (id, quantity) =>
    set((state) => {
      if (!Number.isSafeInteger(quantity) || quantity < 0 || !getProduct(id))
        return state;
      if (!state.cartItems.some((item) => item.productId === id)) return state;
      return {
        cartItems:
          quantity === 0
            ? state.cartItems.filter((item) => item.productId !== id)
            : state.cartItems.map((item) =>
                item.productId === id ? { ...item, quantity } : item,
              ),
      };
    }),
  applyPromoCode: (code) => {
    const valid = code.trim().toUpperCase() === BIKE30_CODE;
    set({ appliedPromoCode: valid ? BIKE30_CODE : null });
    return valid;
  },
  toggleFavorite: (id) =>
    set((state) => ({
      favoriteIds: state.favoriteIds.includes(id)
        ? state.favoriteIds.filter((favoriteId) => favoriteId !== id)
        : [...state.favoriteIds, id],
    })),
}));
