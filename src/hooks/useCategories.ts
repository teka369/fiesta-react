import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchCategories, fetchCategoryById } from '../lib/api';

/**
 * Hook para obtener categorías con React Query
 * Usa cache para evitar llamadas repetidas
 */
export function useCategories() {
  const queryClient = useQueryClient();
  
  const { data, isLoading, error, isFetching, refetch, dataUpdatedAt } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 1,
    refetchOnWindowFocus: false,
  });

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ['categories'] });
  };

  return {
    categories: data ?? [],
    isLoading,
    isFetching,
    error,
    refetch,
    invalidate,
    dataUpdatedAt,
  };
}

/**
 * Hook para obtener una categoría por ID
 */
export function useCategory(id: string | undefined) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['category', id],
    queryFn: () => fetchCategoryById(id!),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  return { category: data, isLoading, error, refetch };
}
