const AUTH_KEY = 'fiesta_admin_token';
const USER_KEY = 'fiesta_admin_user';

export function getStoredToken(): string | null {
  return localStorage.getItem(AUTH_KEY);
}

export type StoredUser = { id: string; email: string; role: string; name?: string | null };

export function setStoredAuth(token: string, user: StoredUser) {
  localStorage.setItem(AUTH_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function updateStoredUser(user: StoredUser) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function clearStoredAuth() {
  localStorage.removeItem(AUTH_KEY);
  localStorage.removeItem(USER_KEY);
}

export function getStoredUser(): StoredUser | null {
  const u = localStorage.getItem(USER_KEY);
  if (!u) return null;
  try {
    return JSON.parse(u);
  } catch {
    return null;
  }
}

export { AUTH_KEY, USER_KEY };
