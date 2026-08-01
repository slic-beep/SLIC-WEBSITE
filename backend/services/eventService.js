const { listDocuments, getDocument, createDocument, updateDocument } = require('../lib/appwrite/database');
const { getAppwriteConfig } = require('../lib/appwrite/client');

function getCollectionId() {
  return getAppwriteConfig().collectionIds.events;
}

function normalizeEvent(event) {
  return {
    ...event,
    name: event.name || event.title || '',
    time: event.time || '',
    eventType: event.eventType || '',
    bannerImage: event.bannerImage || '',
    registrationLink: event.registrationLink || '',
    maxParticipants: event.maxParticipants ?? null,
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
    eventType: payload.eventType || '',
    date: payload.date || '',
    time: payload.time || '',
    location: payload.location || '',
    bannerImage: payload.bannerImage || '',
    registrationLink: payload.registrationLink || '',
    maxParticipants: payload.maxParticipants ?? null,
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
