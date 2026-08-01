const { listDocuments, getDocument, createDocument, updateDocument } = require('../lib/appwrite/database');
const { getAppwriteConfig } = require('../lib/appwrite/client');

function getCollectionId() {
  return getAppwriteConfig().collectionIds.programs;
}

function sanitizeThumbnail(value) {
  if (typeof value !== 'string') return '';

  const trimmed = value.trim();
  if (!trimmed) return '';
  if (/\s/.test(trimmed)) return '';

  if (/^(https?:\/\/|\/\/)/i.test(trimmed) || trimmed.startsWith('/')) {
    return trimmed;
  }

  if (/\.(png|jpe?g|gif|webp|svg|avif)(\?.*)?$/i.test(trimmed)) {
    return trimmed;
  }

  return '';
}

function normalizeProgram(program) {
  return {
    ...program,
    title: program.title || '',
    description: program.description || '',
    thumbnail: sanitizeThumbnail(program.thumbnail),
    startDate: program.startDate || program.duration || '',
    status: program.status || '',
    createdAt: program.createdAt || '',
  };
}

async function listPrograms() {
  const response = await listDocuments(getCollectionId());
  const documents = Array.isArray(response.documents) ? response.documents : [];
  return documents.map(normalizeProgram);
}

async function createProgram(payload) {
  const programData = {
    title: payload.title || '',
    description: payload.description || '',
    thumbnail: sanitizeThumbnail(payload.thumbnail),
    duration: payload.startDate || payload.duration || '',
    status: payload.status || 'Active',
    createdAt: payload.createdAt || new Date().toISOString(),
  };
  return normalizeProgram(await createDocument(getCollectionId(), programData));
}

async function getProgram(documentId) {
  return getDocument(getCollectionId(), documentId);
}

async function updateProgram(documentId, payload) {
  return updateDocument(getCollectionId(), documentId, payload);
}

module.exports = {
  listPrograms,
  createProgram,
  getProgram,
  updateProgram,
};
