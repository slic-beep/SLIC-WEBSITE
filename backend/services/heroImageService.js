const { listDocuments, getDocument, createDocument, updateDocument, deleteDocument } = require('../lib/appwrite/database');
const { getAppwriteConfig } = require('../lib/appwrite/client');

function getCollectionId() {
  return getAppwriteConfig().collectionIds.heroImages;
}

function normalizeHeroImage(heroImage) {
  return {
    ...heroImage,
    title: heroImage.title || '',
    caption: heroImage.caption || '',
    imageUrl: heroImage.imageUrl || heroImage.image || '',
    order: Number.isFinite(Number(heroImage.order)) ? Number(heroImage.order) : 0,
    status: heroImage.status || 'Active',
    createdAt: heroImage.createdAt || '',
  };
}

async function listHeroImages() {
  const response = await listDocuments(getCollectionId());
  const documents = Array.isArray(response.documents) ? response.documents : [];
  return documents
    .map(normalizeHeroImage)
    .sort((a, b) => (a.order - b.order) || String(a.createdAt).localeCompare(String(b.createdAt)));
}

async function createHeroImage(payload) {
  const heroImageData = {
    title: payload.title || '',
    caption: payload.caption || '',
    imageUrl: payload.imageUrl || payload.image || '',
    order: Number.isFinite(Number(payload.order)) ? Number(payload.order) : 0,
    status: payload.status || 'Active',
    createdAt: payload.createdAt || new Date().toISOString(),
  };

  return normalizeHeroImage(await createDocument(getCollectionId(), heroImageData));
}

async function getHeroImage(documentId) {
  return getDocument(getCollectionId(), documentId);
}

async function updateHeroImage(documentId, payload) {
  return normalizeHeroImage(await updateDocument(getCollectionId(), documentId, payload));
}

async function deleteHeroImage(documentId) {
  return deleteDocument(getCollectionId(), documentId);
}

module.exports = {
  listHeroImages,
  createHeroImage,
  getHeroImage,
  updateHeroImage,
  deleteHeroImage,
};
