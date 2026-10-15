import type { ProductImageKey } from '../assets/catalog';

export type ProductId = string;

export type ProductCategory = 'electric-bike' | 'road-bike' | 'mountain-bike' | 'helmet';
export type ProductFilter = 'all' | ProductCategory;

export interface Product {
  id: ProductId;
  category: ProductCategory;
  name: string;
  priceCents: number;
  description: string;
  imageKey: ProductImageKey;
}

export interface CartItem {
  productId: ProductId;
  quantity: number;
}
