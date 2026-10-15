import { create } from "zustand";

import { products } from "../data/products";
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
  favoriteIds: ["peugeot-lr01"],
  cartItems: [
    { productId: "peugeot-lr01", quantity: 1 },
    { productId: "pilot-chromoly-520", quantity: 1 },
    { productId: "smith-trade", quantity: 1 },
  ],
  appliedPromoCode: BIKE30_CODE,
  addToCart: (id) =>
    set((state) => {
      if (!products.some((product) => product.id === id)) return state;
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
      if (
        !Number.isSafeInteger(quantity) ||
        quantity < 0 ||
        !products.some((product) => product.id === id)
      )
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
