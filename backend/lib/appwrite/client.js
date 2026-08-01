const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

function getAppwriteConfig() {
  return {
    endpoint: process.env.APPWRITE_ENDPOINT || 'https://fra.cloud.appwrite.io/v1',
    projectId: process.env.APPWRITE_PROJECT_ID,
    apiKey: process.env.APPWRITE_API_KEY,
    databaseId: process.env.APPWRITE_DATABASE_ID || 'slic-ecosystem',
    collectionIds: {
      members: process.env.APPWRITE_COLLECTION_MEMBERS_ID || 'members',
      projects: process.env.APPWRITE_COLLECTION_PROJECTS_ID || 'projects',
      events: process.env.APPWRITE_COLLECTION_EVENTS_ID || 'events',
      programs: process.env.APPWRITE_COLLECTION_PROGRAMS_ID || 'programs',
      applications: process.env.APPWRITE_COLLECTION_APPLICATIONS_ID || 'applications',
      partners: process.env.APPWRITE_COLLECTION_PARTNERS_ID || 'partners',
      announcements: process.env.APPWRITE_COLLECTION_ANNOUNCEMENTS_ID || 'announcements',
      reports: process.env.APPWRITE_COLLECTION_REPORTS_ID || 'reports',
      leadership: process.env.APPWRITE_COLLECTION_LEADERSHIP_ID || 'leadership',
      heroImages: process.env.APPWRITE_COLLECTION_HERO_IMAGES_ID || 'hero-images',
      impactMetrics: process.env.APPWRITE_COLLECTION_IMPACT_METRICS_ID || 'impact-metrics',
    },
    bucketIds: {
      profileImages: process.env.APPWRITE_BUCKET_PROFILE_IMAGES_ID || 'profile-images',
      programThumbnails:
        process.env.APPWRITE_BUCKET_PROGRAM_THUMBNAILS_ID ||
        process.env.APPWRITE_BUCKET_PROFILE_IMAGES_ID ||
        'profile-images',
      projectImages:
        process.env.APPWRITE_BUCKET_PROJECT_IMAGES_ID ||
        process.env.APPWRITE_BUCKET_PROFILE_IMAGES_ID ||
        'profile-images',
      eventBanners:
        process.env.APPWRITE_BUCKET_EVENT_BANNERS_ID ||
        process.env.APPWRITE_BUCKET_PROFILE_IMAGES_ID ||
        'profile-images',
      partnerLogos:
        process.env.APPWRITE_BUCKET_PARTNER_LOGOS_ID ||
        process.env.APPWRITE_BUCKET_PROFILE_IMAGES_ID ||
        'profile-images',
    },
  };
}

async function appwriteRequest(pathname, options = {}, sessionToken = null) {
  const { endpoint, projectId, apiKey } = getAppwriteConfig();
  const baseUrl = endpoint.endsWith('/') ? endpoint : `${endpoint}/`;
  const url = new URL(pathname.replace(/^\/+/, ''), baseUrl);

  const bodyIsFormData = options.body && typeof FormData !== 'undefined' && options.body instanceof FormData;
  // When a user session token is present, scope the request to that user and do NOT
  // send the server API key — mixing X-Appwrite-Key with X-Appwrite-Session causes
  // Appwrite to reject user-scoped requests (e.g. GET /account -> 401).
  const headers = {
    ...(bodyIsFormData ? {} : { 'Content-Type': 'application/json' }),
    'X-Appwrite-Project': projectId,
    ...(sessionToken ? { 'X-Appwrite-Session': sessionToken } : apiKey ? { 'X-Appwrite-Key': apiKey } : {}),
    ...(options.headers || {}),
  };

  const response = await fetch(url, {
    method: options.method || 'GET',
    headers,
    ...(options.body ? { body: options.body } : {}),
  });

  const text = await response.text();
  let payload = null;
  if (text) {
    try {
      payload = JSON.parse(text);
    } catch (error) {
      payload = text;
    }
  }

  if (!response.ok) {
    const message = payload && payload.message ? payload.message : 'Appwrite request failed';
    const error = new Error(message);
    error.status = response.status;
    error.payload = payload;
    throw error;
  }

  return payload;
}

function buildPermissions({ read = ['any'], write = ['users'] } = {}) {
  return [
    ...read.map((role) => `read("${role}")`),
    ...write.map((role) => `write("${role}")`),
  ];
}

module.exports = {
  getAppwriteConfig,
  appwriteRequest,
  buildPermissions,
};
