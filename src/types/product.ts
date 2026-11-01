export type Category = 'women' | 'kids';

export type KidsAgeGroup = '0-12m' | '1-3y' | '4-7y' | '8-12y';

export interface ProductColor {
  name: string;
  hex: string;
  imageIndex: number;
}

export interface ProductSize {
  size: string;
  inStock: boolean;
  stockCount?: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;              // In TND (Tunisian Dinar)
  salePrice?: number | null;  // In TND
  category: Category;
  subcategory: string;
  ageGroup?: KidsAgeGroup;    // Kids only
  colors: ProductColor[];
  sizes: ProductSize[];
  images: string[];           // [main, hover_secondary, detail_1, detail_2, ...]
  fabric: string;
  care: string[];
  isNew: boolean;
  isBestSeller: boolean;
  rating?: number;
  reviewCount?: number;
}

export interface CartItem {
  id: string;                 // unique key: `${productId}-${color}-${size}`
  product: Product;
  selectedColor: ProductColor;
  selectedSize: string;
  quantity: number;
}

export interface FilterState {
  category?: Category;
  ageGroup?: KidsAgeGroup | 'all';
  subcategory?: string | 'all';
  sizes: string[];
  colors: string[];
  priceRange: [number, number];
  sortBy: 'featured' | 'newest' | 'price-asc' | 'price-desc' | 'rating';
}

