import { create } from 'zustand';

import { products } from '../data/products';
import type { CartItem, ProductId } from '../types/product';

type ShopState = {
  favoriteIds: ProductId[];
  toggleFavorite: (id: ProductId) => void;
  cartItems: CartItem[];
  addToCart: (id: ProductId) => void;
};

export const useShopStore = create<ShopState>()((set) => ({
  favoriteIds: ['peugeot-lr01'],
  cartItems: [],
  addToCart: (id) => set((state) => {
    if (!products.some(product => product.id === id)) return state;
    const existing = state.cartItems.find(item => item.productId === id);
    return {
      cartItems: existing
        ? state.cartItems.map(item => item.productId === id ? { ...item, quantity: item.quantity + 1 } : item)
        : [...state.cartItems, { productId: id, quantity: 1 }],
    };
  }),
  toggleFavorite: (id) => set((state) => ({
    favoriteIds: state.favoriteIds.includes(id)
      ? state.favoriteIds.filter((favoriteId) => favoriteId !== id)
      : [...state.favoriteIds, id],
  })),
}));
