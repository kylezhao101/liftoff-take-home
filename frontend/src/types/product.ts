export type ProductId = string;

export type ProductCategory = 'road-bike' | 'mountain-bike' | 'helmet';

export interface Product {
  id: ProductId;
  category: ProductCategory;
  name: string;
  priceCents: number;
  description: string;
}

export interface CartItem {
  productId: ProductId;
  quantity: number;
}
