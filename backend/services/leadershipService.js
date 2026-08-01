const { listDocuments, createDocument, getDocument, updateDocument, deleteDocument } = require('../lib/appwrite/database');
const { getAppwriteConfig } = require('../lib/appwrite/client');

function getCollectionId() {
  return getAppwriteConfig().collectionIds.leadership;
}

function normalizeMember(member) {
  return {
    ...member,
    name: member.name || '',
    role: member.role || '',
    bio: member.bio || '',
    image: member.image || member.profileImage || '',
    socialLinkedin: member.socialLinkedin || '',
    socialTwitter: member.socialTwitter || '',
    sortOrder: typeof member.sortOrder === 'number' ? member.sortOrder : 0,
    status: member.status || 'Active',
    createdAt: member.createdAt || member.$createdAt || new Date().toISOString(),
  };
}

function sortMembers(members) {
  return [...members].sort((a, b) => {
    if (a.status === 'Active' && b.status !== 'Active') return -1;
    if (a.status !== 'Active' && b.status === 'Active') return 1;
    return (Number(a.sortOrder) || 0) - (Number(b.sortOrder) || 0);
  });
}

async function listLeadership() {
  const response = await listDocuments(getCollectionId());
  const documents = Array.isArray(response.documents) ? response.documents : [];
  return sortMembers(documents.map(normalizeMember));
}

async function getPublicLeadership() {
  const response = await listDocuments(getCollectionId());
  const documents = Array.isArray(response.documents) ? response.documents : [];
  return sortMembers(
    documents
      .map(normalizeMember)
      .filter((m) => m.status !== 'Inactive' && m.status !== 'Archived' && m.name && m.role)
  );
}

async function createLeader(payload) {
  const data = {
    name: payload.name || '',
    role: payload.role || '',
    bio: payload.bio || '',
    image: payload.image || payload.profileImage || '',
    socialLinkedin: payload.socialLinkedin || '',
    socialTwitter: payload.socialTwitter || '',
    sortOrder: typeof payload.sortOrder === 'number' ? payload.sortOrder : 0,
    status: payload.status || 'Active',
    createdAt: payload.createdAt || new Date().toISOString(),
  };
  return normalizeMember(await createDocument(getCollectionId(), data));
}

async function getLeader(documentId) {
  return normalizeMember(await getDocument(getCollectionId(), documentId));
}

async function updateLeader(documentId, payload) {
  return normalizeMember(await updateDocument(getCollectionId(), documentId, payload));
}

async function deleteLeader(documentId) {
  await deleteDocument(getCollectionId(), documentId);
  return { success: true };
}

module.exports = {
  listLeadership,
  getPublicLeadership,
  createLeader,
  getLeader,
  updateLeader,
  deleteLeader,
};
