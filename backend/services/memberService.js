const crypto = require('crypto');
const { listDocuments, getDocument, createDocument, updateDocument } = require('../lib/appwrite/database');
const { getAppwriteConfig } = require('../lib/appwrite/client');

function getCollectionId() {
  return getAppwriteConfig().collectionIds.members;
}

function normalizeMember(member) {
  return {
    ...member,
    name: member.name || member.fullName || member.userId || '',
    fullName: member.fullName || member.name || '',
    email: member.email || '',
    phoneNumber: member.phoneNumber || '',
    studentId: member.studentId || '',
    faculty: member.faculty || '',
    course: member.course || '',
    yearOfStudy: member.yearOfStudy || '',
    skills: Array.isArray(member.skills)
      ? member.skills
      : typeof member.skills === 'string'
      ? member.skills.split(',').map((s) => s.trim()).filter(Boolean)
      : [],
    interests: Array.isArray(member.interests)
      ? member.interests
      : typeof member.interests === 'string'
      ? member.interests.split(',').map((s) => s.trim()).filter(Boolean)
      : [],
    membershipType: member.membershipType || '',
    profileImage: member.profileImage || '',
    bio: member.bio || '',
    role: member.role || '',
    status: member.status || '',
    createdAt: member.createdAt || member.$createdAt || '',
  };
}

async function listMembers() {
  const response = await listDocuments(getCollectionId());
  const documents = Array.isArray(response.documents) ? response.documents : [];
  return documents.map(normalizeMember);
}

async function createMember(payload) {
  const memberData = {
    // The student ID is the user's primary identifier — use it as userId when provided.
    userId: payload.userId || payload.studentId || payload.email || payload.name || crypto.randomUUID(),
    fullName: payload.fullName || payload.name || '',
    email: payload.email || '',
    phoneNumber: payload.phoneNumber || '',
    studentId: payload.studentId || '',
    faculty: payload.faculty || '',
    course: payload.course || '',
    yearOfStudy: payload.yearOfStudy || '',
    skills: Array.isArray(payload.skills)
      ? payload.skills
      : typeof payload.skills === 'string'
      ? payload.skills.split(',').map((s) => s.trim()).filter(Boolean)
      : [],
    interests: Array.isArray(payload.interests)
      ? payload.interests
      : typeof payload.interests === 'string'
      ? payload.interests.split(',').map((s) => s.trim()).filter(Boolean)
      : [],
    membershipType: payload.membershipType || 'Student',
    profileImage: payload.profileImage || '',
    bio: payload.bio || '',
    role: payload.role || 'Visitor',
    status: payload.status || 'Pending',
    createdAt: payload.createdAt || new Date().toISOString(),
  };
  return normalizeMember(await createDocument(getCollectionId(), memberData));
}

async function getMember(documentId) {
  const doc = await getDocument(getCollectionId(), documentId);
  return normalizeMember(doc);
}

async function getMemberByEmail(email) {
  const response = await listDocuments(getCollectionId());
  const documents = Array.isArray(response.documents) ? response.documents : [];
  return documents.find((d) => d.email === email) || null;
}

async function updateMember(documentId, payload) {
  const doc = await updateDocument(getCollectionId(), documentId, payload);
  return normalizeMember(doc);
}

module.exports = {
  listMembers,
  createMember,
  getMember,
  getMemberByEmail,
  updateMember,
};
