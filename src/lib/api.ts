/**
 * Cliente API para el backend Nest.
 * Desarrollo: proxy /api -> backend (vite.config).
 * Producción: VITE_API_URL en Vercel debe ser la URL del backend en Render (sin / final).
 */
import { getStoredToken } from './auth-storage';

const API_BASE = (import.meta.env.VITE_API_URL ?? '/api').replace(/\/$/, '');

function authHeaders(): HeadersInit {
  const token = getStoredToken();
  const h: HeadersInit = { 'Content-Type': 'application/json' };
  if (token) (h as Record<string, string>)['Authorization'] = `Bearer ${token}`;
  return h;
}

function authHeadersForForm(): HeadersInit {
  const token = getStoredToken();
  const h: HeadersInit = {};
  if (token) (h as Record<string, string>)['Authorization'] = `Bearer ${token}`;
  return h;
}

function buildQuery(params: Record<string, string | number | undefined>): string {
  const search = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== '') search.set(key, String(value));
  });
  const q = search.toString();
  return q ? `?${q}` : '';
}

export async function fetchProducts(params: {
  page?: number;
  limit?: number;
  status?: string;
  categoryId?: string;
  search?: string;
  sortBy?: string;
  sortOrder?: string;
}) {
  const url = `${API_BASE}/products${buildQuery(params)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Error ${res.status} al cargar productos`);
  return res.json();
}

export async function fetchProductBySlug(slug: string) {
  const res = await fetch(`${API_BASE}/products/by-slug/${encodeURIComponent(slug)}`);
  if (!res.ok) {
    if (res.status === 404) throw new Error('Producto no encontrado');
    throw new Error(`Error ${res.status}`);
  }
  return res.json();
}

export async function fetchProductById(id: string) {
  const res = await fetch(`${API_BASE}/products/${id}`);
  if (!res.ok) {
    if (res.status === 404) throw new Error('Producto no encontrado');
    throw new Error(`Error ${res.status}`);
  }
  return res.json();
}

export async function fetchContactLink(
  productId: string,
  channel: 'whatsapp' | 'phone' = 'whatsapp',
  phone?: string
) {
  const params = new URLSearchParams({ channel });
  if (phone) params.set('phone', phone);
  const res = await fetch(
    `${API_BASE}/products/contact-link/${productId}${params.toString() ? `?${params}` : ''}`
  );
  if (!res.ok) throw new Error('No se pudo obtener el enlace de contacto');
  return res.json();
}

export async function uploadProductImage(file: File) {
  const form = new FormData();
  form.append('file', file);

  const res = await fetch(`${API_BASE}/products/upload-image`, {
    method: 'POST',
    headers: authHeadersForForm(),
    body: form,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || 'Error uploading image');
  }

  return res.json() as Promise<{ url: string }>;
}

// ======== SETTINGS (site configuration) ========

export interface SiteSettings {
  googleMapsEmbedUrl?: string | null;
}

export async function fetchSettings(): Promise<SiteSettings> {
  const res = await fetch(`${API_BASE}/settings`);
  if (!res.ok) throw new Error(`Error ${res.status} loading settings`);
  return res.json();
}

export async function updateSettings(body: SiteSettings): Promise<SiteSettings> {
  const res = await fetch(`${API_BASE}/settings`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `Error ${res.status} updating settings`);
  }
  return res.json();
}

// ——— Auth / perfil (requieren login) ———

export async function fetchProfile() {
  const res = await fetch(`${API_BASE}/auth/me`, {
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error(res.status === 401 ? 'No autorizado' : `Error ${res.status}`);
  return res.json();
}

export async function updateProfile(body: {
  name?: string;
  email?: string;
  currentPassword?: string;
  newPassword?: string;
}) {
  const res = await fetch(`${API_BASE}/auth/me`, {
    method: 'PATCH',
    headers: authHeaders(),
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `Error ${res.status}`);
  }
  return res.json();
}

// ——— Admin productos (requieren login) ———

export async function createProduct(body: unknown) {
  const res = await fetch(`${API_BASE}/products`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `Error ${res.status}`);
  }
  return res.json();
}

export async function updateProduct(id: string, body: unknown) {
  const res = await fetch(`${API_BASE}/products/${id}`, {
    method: 'PATCH',
    headers: authHeaders(),
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `Error ${res.status}`);
  }
  return res.json();
}

export async function deleteProduct(id: string) {
  const res = await fetch(`${API_BASE}/products/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error(`Error ${res.status}`);
}

// ——— Categorías (GET público; POST/PATCH/DELETE con login) ———

export async function fetchCategories() {
  const res = await fetch(`${API_BASE}/categories`);
  if (!res.ok) throw new Error(`Error ${res.status}`);
  return res.json();
}

export async function fetchCategoryById(id: string) {
  const res = await fetch(`${API_BASE}/categories/${id}`);
  if (!res.ok) {
    if (res.status === 404) throw new Error('Categoría no encontrada');
    throw new Error(`Error ${res.status}`);
  }
  return res.json();
}

export async function createCategory(body: { name: string; slug?: string; description?: string; imageUrl?: string; sortOrder?: number; isActive?: boolean }) {
  const res = await fetch(`${API_BASE}/categories`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `Error ${res.status}`);
  }
  return res.json();
}

export async function updateCategory(id: string, body: { name?: string; slug?: string; description?: string; imageUrl?: string; sortOrder?: number; isActive?: boolean }) {
  const res = await fetch(`${API_BASE}/categories/${id}`, {
    method: 'PATCH',
    headers: authHeaders(),
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `Error ${res.status}`);
  }
  return res.json();
}

export async function deleteCategory(id: string) {
  const res = await fetch(`${API_BASE}/categories/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error(`Error ${res.status}`);
}

// ——— Paquetes (GET público; POST/PATCH/DELETE con login) ———

export async function fetchPackages() {
  const res = await fetch(`${API_BASE}/packages`);
  if (!res.ok) throw new Error(`Error ${res.status}`);
  return res.json();
}

export async function fetchPackageById(id: string) {
  const res = await fetch(`${API_BASE}/packages/${id}`);
  if (!res.ok) {
    if (res.status === 404) throw new Error('Paquete no encontrado');
    throw new Error(`Error ${res.status}`);
  }
  return res.json();
}

export async function createPackage(body: { title: string; slug?: string; description?: string; specialPrice: number; isActive?: boolean; items?: { productId: string; quantity: number }[] }) {
  const res = await fetch(`${API_BASE}/packages`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `Error ${res.status}`);
  }
  return res.json();
}

export async function updatePackage(id: string, body: { title?: string; slug?: string; description?: string; specialPrice?: number; isActive?: boolean; items?: { productId: string; quantity: number }[] }) {
  const res = await fetch(`${API_BASE}/packages/${id}`, {
    method: 'PATCH',
    headers: authHeaders(),
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `Error ${res.status}`);
  }
  return res.json();
}

export async function deletePackage(id: string) {
  const res = await fetch(`${API_BASE}/packages/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error(`Error ${res.status}`);
}
