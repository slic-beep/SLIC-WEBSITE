const { listDocuments, createDocument, getDocument, updateDocument } = require('../lib/appwrite/database');
const { getAppwriteConfig } = require('../lib/appwrite/client');

function getCollectionId() {
  return getAppwriteConfig().collectionIds.announcements;
}

function normalizeAnnouncement(doc) {
  return {
    ...doc,
    title: doc.title || '',
    content: doc.content || doc.description || '',
    priority: doc.priority || 'normal',
    status: doc.status || 'active',
    createdAt: doc.createdAt || doc.$createdAt || '',
  };
}

async function getAnnouncements(req, res) {
  try {
    const response = await listDocuments(getCollectionId());
    const documents = Array.isArray(response.documents) ? response.documents : [];
    res.json({ success: true, data: documents.map(normalizeAnnouncement) });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

async function getLatestAnnouncements(req, res) {
  try {
    const response = await listDocuments(getCollectionId());
    const documents = Array.isArray(response.documents) ? response.documents : [];
    const sorted = documents
      .map(normalizeAnnouncement)
      .filter((a) => a.status === 'active')
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 5);
    res.json({ success: true, data: sorted });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

async function createAnnouncementHandler(req, res) {
  try {
    const payload = {
      title: req.body.title || '',
      content: req.body.content || req.body.description || '',
      priority: req.body.priority || 'normal',
      status: req.body.status || 'active',
      createdAt: new Date().toISOString(),
    };
    const doc = await createDocument(getCollectionId(), payload);
    res.status(201).json({ success: true, data: normalizeAnnouncement(doc) });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
}

async function getAnnouncementHandler(req, res) {
  try {
    const doc = await getDocument(getCollectionId(), req.params.id);
    res.json({ success: true, data: normalizeAnnouncement(doc) });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
}

async function updateAnnouncementHandler(req, res) {
  try {
    const doc = await updateDocument(getCollectionId(), req.params.id, req.body);
    res.json({ success: true, data: normalizeAnnouncement(doc) });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
}

module.exports = {
  getAnnouncements,
  getLatestAnnouncements,
  createAnnouncementHandler,
  getAnnouncementHandler,
  updateAnnouncementHandler,
};
