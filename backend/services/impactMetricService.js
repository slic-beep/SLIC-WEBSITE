const { listDocuments, createDocument, updateDocument, deleteDocument } = require('../lib/appwrite/database');
const { getAppwriteConfig } = require('../lib/appwrite/client');

function getCollectionId() {
  return getAppwriteConfig().collectionIds.impactMetrics;
}

function normalizeImpactMetric(metric) {
  return {
    ...metric,
    label: metric.label || '',
    value: Number.isFinite(Number(metric.value)) ? Number(metric.value) : 0,
    suffix: metric.suffix || '',
    order: Number.isFinite(Number(metric.order)) ? Number(metric.order) : 0,
    status: metric.status || 'Active',
    createdAt: metric.createdAt || '',
  };
}

async function listImpactMetrics() {
  try {
    const response = await listDocuments(getCollectionId());
    const documents = Array.isArray(response.documents) ? response.documents : [];
    return documents
      .map(normalizeImpactMetric)
      .sort((a, b) => (a.order - b.order) || String(a.createdAt).localeCompare(String(b.createdAt)));
  } catch (error) {
    if (error?.status === 404 || error?.message?.includes('collection') || error?.message?.includes('not found')) {
      return [];
    }
    throw error;
  }
}

async function createImpactMetric(payload) {
  const impactMetricData = {
    label: payload.label || '',
    value: Number.isFinite(Number(payload.value)) ? Number(payload.value) : 0,
    suffix: payload.suffix || '',
    order: Number.isFinite(Number(payload.order)) ? Number(payload.order) : 0,
    status: payload.status || 'Active',
    createdAt: payload.createdAt || new Date().toISOString(),
  };

  return normalizeImpactMetric(await createDocument(getCollectionId(), impactMetricData));
}

async function getImpactMetric(documentId) {
  const { getDocument } = require('../lib/appwrite/database');
  return normalizeImpactMetric(await getDocument(getCollectionId(), documentId));
}

async function updateImpactMetric(documentId, payload) {
  return normalizeImpactMetric(await updateDocument(getCollectionId(), documentId, payload));
}

async function deleteImpactMetric(documentId) {
  return deleteDocument(getCollectionId(), documentId);
}

module.exports = {
  listImpactMetrics,
  createImpactMetric,
  getImpactMetric,
  updateImpactMetric,
  deleteImpactMetric,
};
