import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchProducts, fetchProductBySlug, fetchProductById } from '../lib/api';

export interface ProductQueryParams {
  page?: number;
  limit?: number;
  status?: string;
  categoryId?: string;
  search?: string;
  sortBy?: string;
  sortOrder?: string;
}

const DEFAULT_QUERY: ProductQueryParams = {
  page: 1,
  limit: 20,
  sortBy: 'createdAt',
  sortOrder: 'desc',
};

/**
 * Hook para obtener productos con React Query
 * Usa cache para evitar llamadas repetidas
 */
export function useProducts(params: ProductQueryParams = DEFAULT_QUERY) {
  const queryClient = useQueryClient();
  
  const queryKey = ['products', params];
  
  const { data, isLoading, error, isFetching, refetch, dataUpdatedAt } = useQuery({
    queryKey,
    queryFn: () => fetchProducts(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 1,
    refetchOnWindowFocus: false,
  });

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ['products'] });
  };

  return {
    products: data?.data ?? [],
    meta: data?.meta ?? { total: 0, page: 1, limit: 20, totalPages: 0 },
    isLoading,
    isFetching,
    error,
    refetch,
    invalidate,
    dataUpdatedAt,
  };
}

/**
 * Hook para obtener un producto por ID
 */
export function useProduct(id: string | undefined) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProductById(id!),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  return { product: data, isLoading, error, refetch };
}

/**
 * Hook para obtener un producto por slug
 */
export function useProductBySlug(slug: string | undefined) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['product-slug', slug],
    queryFn: () => fetchProductBySlug(slug!),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  return { product: data, isLoading, error, refetch };
}
