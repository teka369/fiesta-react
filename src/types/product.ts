/**
 * Tipos alineados con el backend (Nest + Prisma).
 * Product, Category, ProductImage y respuestas de la API de productos.
 */

export type ProductStatus = 'DISPONIBLE' | 'OCUPADO' | 'VENDIDO' | 'EN_CAMINO';

export type ProductSaleType = 'COMPRABLE' | 'ALQUILABLE';

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  imageUrl?: string | null;
  sortOrder: number;
  isActive: boolean;
}

export interface ProductImage {
  id: string;
  productId: string;
  url: string;
  alt?: string | null;
  sortOrder: number;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  description: string;
  price: string | number;
  status: ProductStatus;
  saleType?: ProductSaleType;
  categoryId?: string | null;
  sortOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  images?: ProductImage[];
  category?: Category | null;
}

export interface ProductsMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ProductsResponse {
  data: Product[];
  meta: ProductsMeta;
}

export interface ContactLinkResponse {
  url: string;
  label: string;
}

export type SortByOption = 'title' | 'price' | 'createdAt' | 'status';
export type SortOrderOption = 'asc' | 'desc';

export interface ProductQueryParams {
  page?: number;
  limit?: number;
  status?: ProductStatus;
  categoryId?: string;
  search?: string;
  sortBy?: SortByOption;
  sortOrder?: SortOrderOption;
}

// ——— Paquetes (alineado con backend) ———

export interface PackageItem {
  id: string;
  packageId: string;
  productId: string;
  quantity: number;
  sortOrder: number;
  product?: Product;
}

export interface Package {
  id: string;
  title: string;
  slug: string;
  description?: string | null;
  specialPrice: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  items?: PackageItem[];
}
