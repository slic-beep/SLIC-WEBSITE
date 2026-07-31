const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

// ─── Generic fetch helpers ───

async function fetchJson<T = unknown>(path: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  });
  const payload = await response.json();
  if (!response.ok) {
    throw new Error(payload?.message || 'Request failed');
  }
  return payload as T;
}

async function fetchWithAuth<T = unknown>(
  path: string,
  token: string | null,
  options: RequestInit = {}
): Promise<T> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  return fetchJson<T>(path, { ...options, headers });
}

// ─── Response types ───

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// ─── Auth ───

export async function register(payload: Record<string, unknown>) {
  return fetchJson<ApiResponse<{ session: string; userId: string; member: Record<string, unknown> }>>('/auth/register', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function login(email: string, password: string) {
  return fetchJson<ApiResponse<{ session: string; userId: string }>>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

export async function checkSession(token: string) {
  return fetchWithAuth<ApiResponse<Record<string, unknown>>>('/auth/session', token);
}

export async function logout(token: string) {
  return fetchWithAuth<ApiResponse<null>>('/auth/logout', token, { method: 'POST' });
}

// ─── Members ───

export async function applyMembership(payload: Record<string, unknown>) {
  return fetchJson<ApiResponse<Record<string, unknown>>>('/members', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function getMemberProfile(token: string) {
  return fetchWithAuth<ApiResponse<Record<string, unknown>>>('/members/profile', token);
}

// ─── Public data ───

export async function getPublicEvents() {
  const res = await fetchJson<ApiResponse<Array<Record<string, unknown>>>>('/events');
  return res;
}

export async function getPublicProjects() {
  const res = await fetchJson<ApiResponse<Array<Record<string, unknown>>>>('/projects');
  return res;
}

export async function getPublicPrograms() {
  const res = await fetchJson<ApiResponse<Array<Record<string, unknown>>>>('/programs');
  return res;
}

export async function getPublicPartners() {
  const res = await fetchJson<ApiResponse<Array<Record<string, unknown>>>>('/partners');
  return res;
}

export async function getPublicAnnouncements() {
  const res = await fetchJson<ApiResponse<Array<Record<string, unknown>>>>('/announcements/latest');
  return res;
}

export async function submitApplication(payload: Record<string, unknown>) {
  return fetchJson<ApiResponse<Record<string, unknown>>>('/applications', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

// ─── File upload ───

export async function uploadFile(file: File, bucket = 'projectImages') {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('bucket', bucket);

  const response = await fetch(`${API_BASE_URL}/upload`, {
    method: 'POST',
    body: formData,
  });
  const payload = await response.json();
  if (!response.ok) throw new Error(payload?.message || 'Upload failed');
  return payload as ApiResponse<{ fileId: string; url: string; name: string }>;
}
