export type Product = {
  name: string;
  gtin: string;
  recommendedRetailPrice: number;
  recommendedRetailPriceCurrency: string;
  imageUrl: string;
  brandName: string;
  categoryName: string;
};

/**
 * The response type of errors from /api/*.
 */
export type ErrorResponse = string;

/**
 * The response type of /api/products
 */
export type ProductsResponse = {
  count: number;
  page: number;
  results: Product[];
};

/**
 * The response type of /api/products/[gtin].
 */
export type ProductResponse = Product;

/**
 * Cart item type of store.cart
 */
export type CartItem = {
  gtin: string;
  name: string;
  imageUrl: string;
  quantity?: number;
  recommendedRetailPrice: number,
  recommendedRetailPriceCurrency: string,
}

export type CartState = {
  items: CartItem[],
}

export type AppState = {
  cart: CartState
}
