const { listDocuments, getDocument, createDocument, updateDocument } = require('../lib/appwrite/database');
const { getAppwriteConfig } = require('../lib/appwrite/client');

function getCollectionId() {
  return getAppwriteConfig().collectionIds.programs;
}

function normalizeProgram(program) {
  return {
    ...program,
    title: program.title || '',
    description: program.description || '',
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
