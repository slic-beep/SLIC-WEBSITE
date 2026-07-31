const crypto = require('crypto');
const { listDocuments, createDocument, getDocument, updateDocument } = require('../lib/appwrite/database');
const { getAppwriteConfig } = require('../lib/appwrite/client');

function getCollectionId() {
  return getAppwriteConfig().collectionIds.applications;
}

function parseApplicationData(data) {
  if (!data || typeof data !== 'string') {
    return {};
  }
  try {
    return JSON.parse(data);
  } catch (error) {
    return {};
  }
}

function normalizeApplication(application) {
  return {
    ...application,
    name: application.name || application.applicantName || '',
    email: application.email || '',
    program: application.program || '',
    status: application.status || '',
    reviewedBy: application.reviewedBy || '',
    applicationType: application.applicationType || '',
    applicantId: application.applicantId || '',
    submittedAt: application.submittedAt || application.createdAt || '',
  };
}

async function listApplications() {
  const response = await listDocuments(getCollectionId());
  const documents = Array.isArray(response.documents) ? response.documents : [];
  return documents.map(normalizeApplication);
}

async function createApplication(payload) {
  const applicationData = {
    name: payload.name || '',
    email: payload.email || '',
    program: payload.program || '',
    reviewedBy: payload.reviewedBy || '',
    applicationType: payload.applicationType || payload.program || 'General',
    applicantId: payload.applicantId || payload.email || crypto.randomUUID(),
    status: payload.status || 'Pending',
    submittedAt: payload.submittedAt || payload.createdAt || new Date().toISOString(),
    createdAt: payload.createdAt || new Date().toISOString(),
  };
  return normalizeApplication(await createDocument(getCollectionId(), applicationData));
}

async function getApplication(documentId) {
  return normalizeApplication(await getDocument(getCollectionId(), documentId));
}

async function updateApplication(documentId, payload) {
  return normalizeApplication(await updateDocument(getCollectionId(), documentId, payload));
}

module.exports = {
  listApplications,
  createApplication,
  getApplication,
  updateApplication,
};
