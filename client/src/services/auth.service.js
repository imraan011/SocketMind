/**
 * Auth service handles API communication with credentials: "include"
 * to support httpOnly cookie session management.
 */

const API_BASE = import.meta.env.VITE_API_URL || '';
const USER_KEY = 'socketmind_user';

// Local storage se user retrieve kar rahe hain
export function getStoredUser() {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

// Login/register success par user info store karna
export function setStoredUser(user) {
  try {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  } catch {
    // Storage quota or privacy mode error silently ignored
  }
}

// User logout karne par storage clear karna
export function clearStoredUser() {
  try {
    localStorage.removeItem(USER_KEY);
  } catch {
    // Storage access error silently ignored
  }
}

// Check if user session exists locally
export function isAuthenticated() {
  return Boolean(getStoredUser());
}

/**
 * Handle API responses and throw informative error message
 */
async function handleResponse(response) {
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const message = data.message || `Request failed with status ${response.status}`;
    throw new Error(message);
  }
  return data;
}

// POST /api/auth/login
export async function loginUserApi(email, password) {
  const response = await fetch(`${API_BASE}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ email, password }),
  });
  return handleResponse(response);
}

// POST /api/auth/register
export async function registerUserApi(fullname, email, password) {
  const response = await fetch(`${API_BASE}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ fullname, email, password }),
  });
  return handleResponse(response);
}
