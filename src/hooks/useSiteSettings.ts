import { useQueryClient } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import { fetchSettings, type SiteSettings } from '../lib/api';

const DEFAULT_PHONE = '+1234567890';

export function useSiteSettings() {
  const queryClient = useQueryClient();
  
  const { data: settings, isLoading: loading, error, dataUpdatedAt } = useQuery<SiteSettings>({
    queryKey: ['site-settings'],
    queryFn: fetchSettings,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 1,
    refetchOnWindowFocus: false,
  });

  const refetch = () => {
    queryClient.invalidateQueries({ queryKey: ['site-settings'] });
  };

  const phone = settings?.contactPhone || DEFAULT_PHONE;
  
  return { settings: settings ?? null, loading, phone, error, refetch, dataUpdatedAt };
}

export { DEFAULT_PHONE };
