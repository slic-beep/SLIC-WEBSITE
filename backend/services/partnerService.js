const { listDocuments, getDocument, createDocument, updateDocument } = require('../lib/appwrite/database');
const { getAppwriteConfig } = require('../lib/appwrite/client');

function getCollectionId() {
  return getAppwriteConfig().collectionIds.partners;
}

function normalizePartner(partner) {
  return {
    ...partner,
    name: partner.name || '',
    website: partner.website || '',
    description: partner.description || '',
    logo: partner.logo || '',
    category: partner.category || '',
    status: partner.status || '',
    createdAt: partner.createdAt || '',
  };
}

async function listPartners() {
  const response = await listDocuments(getCollectionId());
  const documents = Array.isArray(response.documents) ? response.documents : [];
  return documents.map(normalizePartner);
}

async function createPartner(payload) {
  const partnerData = {
    name: payload.name || '',
    website: payload.website || '',
    description: payload.description || '',
    logo: payload.logo || '',
    category: payload.category || '',
    status: payload.status || 'Active',
    createdAt: payload.createdAt || new Date().toISOString(),
  };
  return normalizePartner(await createDocument(getCollectionId(), partnerData));
}

async function getPartner(documentId) {
  return getDocument(getCollectionId(), documentId);
}

async function updatePartner(documentId, payload) {
  return updateDocument(getCollectionId(), documentId, payload);
}

module.exports = {
  listPartners,
  createPartner,
  getPartner,
  updatePartner,
};
