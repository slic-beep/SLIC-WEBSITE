function normalizeApiBaseUrl(input: string) {
  const value = (input || 'http://localhost:4000/api').trim().replace(/\/+$/, '');
  if (value.endsWith('/api')) return value;
  return `${value}/api`;
}

const API_BASE_URL = normalizeApiBaseUrl(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api');

type ApiResponse<T> = {
  success: boolean;
  data: T;
  message?: string;
};

async function fetchJson<T>(path: string): Promise<ApiResponse<T>> {
  const url = `${API_BASE_URL}${path}`;
  const response = await fetch(url, { cache: 'no-store' });

  const text = await response.text();
  let json: unknown = null;
  try {
    json = text ? JSON.parse(text) : null;
  } catch (err) {
    // ignore invalid JSON for downstream handling
  }

  if (!response.ok) {
    throw new Error('Unable to load data from the SLIC API');
  }

  return json as ApiResponse<T>;
}

async function postJson<T>(path: string, payload: Record<string, unknown>): Promise<ApiResponse<T>> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error('Unable to save data to the SLIC API');
  }

  return response.json();
}

async function putJson<T>(path: string, payload: Record<string, unknown>): Promise<ApiResponse<T>> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error('Unable to update data in the SLIC API');
  }

  return response.json();
}

async function deleteJson<T>(path: string): Promise<ApiResponse<T>> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Unable to delete data from the SLIC API');
  }

  return response.json();
}

export type Member = {
  $id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  phoneNumber?: string;
  studentId?: string;
  faculty?: string;
  course?: string;
  yearOfStudy?: string;
  membershipType?: string;
  profileImage?: string;
  bio?: string;
  skills?: string[];
  interests?: string[];
  createdAt: string;
};

export type Project = {
  $id: string;
  title: string;
  description: string;
  problemStatement?: string;
  solution?: string;
  category?: string;
  teamMembers?: string[];
  stage?: string;
  projectImage?: string;
  createdBy?: string;
  status: string;
  createdAt: string;
};

export type EventRecord = {
  $id: string;
  name: string;
  description: string;
  eventType?: string;
  date: string;
  time?: string;
  location: string;
    videoUrl?: string;
  bannerImage?: string;
  registrationLink?: string;
  maxParticipants?: number;
  status?: string;
  createdAt?: string;
};

export type Program = {
  $id: string;
  title: string;
  description: string;
  category?: string;
  duration?: string;
  thumbnail?: string;
  requirements?: string;
  status: string;
  createdAt?: string;
};

export type Partner = {
  $id: string;
  name: string;
  website: string;
  description: string;
  logo?: string;
  category?: string;
  status?: string;
  createdAt?: string;
};

export type HeroImage = {
  $id: string;
  title?: string;
  caption?: string;
  imageUrl?: string;
  order?: number;
  status?: string;
  createdAt?: string;
};

export type ImpactMetric = {
  $id: string;
  label?: string;
  value?: number;
  suffix?: string;
  order?: number;
  status?: string;
  createdAt?: string;
};

export type Application = {
  $id: string;
  name: string;
  email: string;
  program: string;
  status: string;
  submittedAt: string;
  reviewedBy?: string;
  applicantId?: string;
  applicationType?: string;
};

export type Leader = {
  $id: string;
  name: string;
  role: string;
  bio?: string;
  image?: string;
  socialLinkedin?: string;
  socialTwitter?: string;
  sortOrder?: number;
  status?: string;
  createdAt?: string;
};

export type RecentActivity = {
  action: string;
  user: string;
  time: string;
  type: string;
};

export type PendingApproval = {
  name: string;
  type: string;
  status: string;
  time?: string;
  id?: string | null;
};

function normalizeListResponse<T>(response: ApiResponse<unknown>): ApiResponse<T[]> {
  if (Array.isArray(response.data)) {
    return response as ApiResponse<T[]>;
  }

  const responseData = response.data as { documents?: unknown };
  const documents = responseData.documents;
  if (Array.isArray(documents)) {
    return { ...response, data: documents };
  }

  return { ...response, data: [] };
}

export async function getDashboardOverview() {
  const response = await fetchJson<Record<string, number>>('/dashboard/overview');

  if (!response.success) {
    throw new Error(response.message || 'Unable to load dashboard overview');
  }

  return response.data;
}

export async function getMembers() {
  const response = await fetchJson<unknown>('/members');
  return normalizeListResponse<Member>(response);
}

export async function createMember(payload: Record<string, unknown>) {
  return postJson<Member>('/members', payload);
}

export async function getProjects() {
  const response = await fetchJson<unknown>('/projects');
  return normalizeListResponse<Project>(response);
}

export async function createProject(payload: Record<string, unknown>) {
  return postJson<Project>('/projects', payload);
}

export async function getEvents() {
  const response = await fetchJson<unknown>('/events');
  return normalizeListResponse<EventRecord>(response);
}

export async function createEvent(payload: Record<string, unknown>) {
  return postJson<EventRecord>('/events', payload);
}

export async function getPrograms() {
  const response = await fetchJson<unknown>('/programs');
  return normalizeListResponse<Program>(response);
}

export async function createProgram(payload: Record<string, unknown>) {
  return postJson<Program>('/programs', payload);
}

export async function getPartners() {
  const response = await fetchJson<unknown>('/partners');
  return normalizeListResponse<Partner>(response);
}

export async function createPartner(payload: Record<string, unknown>) {
  return postJson<Partner>('/partners', payload);
}

export async function getHeroImages() {
  const response = await fetchJson<unknown>('/hero-images');
  return normalizeListResponse<HeroImage>(response);
}

export async function createHeroImage(payload: Record<string, unknown>) {
  return postJson<HeroImage>('/hero-images', payload);
}

export async function updateHeroImage(id: string, payload: Record<string, unknown>) {
  return putJson<HeroImage>(`/hero-images/${id}`, payload);
}

export async function deleteHeroImage(id: string) {
  return deleteJson<HeroImage>(`/hero-images/${id}`);
}

export async function getImpactMetrics() {
  const response = await fetchJson<unknown>('/impact-metrics');
  return normalizeListResponse<ImpactMetric>(response);
}

export async function createImpactMetric(payload: Record<string, unknown>) {
  return postJson<ImpactMetric>('/impact-metrics', payload);
}

export async function updateImpactMetric(id: string, payload: Record<string, unknown>) {
  return putJson<ImpactMetric>(`/impact-metrics/${id}`, payload);
}

export async function deleteImpactMetric(id: string) {
  return deleteJson<ImpactMetric>(`/impact-metrics/${id}`);
}

export async function getApplications() {
  const response = await fetchJson<unknown>('/applications');
  return normalizeListResponse<Application>(response);
}

export async function createApplication(payload: Record<string, unknown>) {
  return postJson<Application>('/applications', payload);
}

// ─── Leadership ───

export async function getLeadership() {
  const response = await fetchJson<unknown>('/leadership');
  return normalizeListResponse<Leader>(response);
}

export async function createLeader(payload: Record<string, unknown>) {
  return postJson<Leader>('/leadership', payload);
}

// ─── File upload (device → URL) ───

export async function uploadFile(file: File, bucket = 'profileImages') {
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

export async function getRecentActivities() {
  const response = await fetchJson<RecentActivity[]>('/dashboard/recent');
  if (!response.success) throw new Error(response.message || 'Unable to load recent activities');
  return response.data as RecentActivity[];
}

export async function getPendingApprovals() {
  const response = await fetchJson<PendingApproval[]>('/dashboard/pending');
  if (!response.success) throw new Error(response.message || 'Unable to load pending approvals');
  return response.data as PendingApproval[];
}
