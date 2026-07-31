const { listDocuments, getDocument, createDocument, updateDocument } = require('../lib/appwrite/database');
const { getAppwriteConfig } = require('../lib/appwrite/client');

function getCollectionId() {
  return getAppwriteConfig().collectionIds.events;
}

function normalizeEvent(event) {
  return {
    ...event,
    name: event.name || event.title || '',
  };
}

async function listEvents() {
  const response = await listDocuments(getCollectionId());
  const documents = Array.isArray(response.documents) ? response.documents : [];
  return documents.map(normalizeEvent);
}

async function createEvent(payload) {
  const eventData = {
    title: payload.name || payload.title || '',
    description: payload.description || '',
    date: payload.date || '',
    location: payload.location || '',
    status: payload.status || 'Upcoming',
    createdAt: payload.createdAt || new Date().toISOString(),
  };
  return normalizeEvent(await createDocument(getCollectionId(), eventData));
}

async function getEvent(documentId) {
  return getDocument(getCollectionId(), documentId);
}

async function updateEvent(documentId, payload) {
  return updateDocument(getCollectionId(), documentId, payload);
}

module.exports = {
  listEvents,
  createEvent,
  getEvent,
  updateEvent,
};
