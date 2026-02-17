import { useState, useEffect } from 'react';
import { fetchSettings, type SiteSettings } from '../lib/api';

const DEFAULT_PHONE = '+1234567890';

export function useSiteSettings() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSettings()
      .then(setSettings)
      .catch(() => setSettings(null))
      .finally(() => setLoading(false));
  }, []);

  const phone = settings?.contactPhone || DEFAULT_PHONE;
  
  return { settings, loading, phone };
}

export { DEFAULT_PHONE };
