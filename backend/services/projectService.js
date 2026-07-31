const { listDocuments, getDocument, createDocument, updateDocument } = require('../lib/appwrite/database');
const { getAppwriteConfig } = require('../lib/appwrite/client');

function getCollectionId() {
  return getAppwriteConfig().collectionIds.projects;
}

function normalizeProject(project) {
  return {
    ...project,
    title: project.title || project.name || '',
    description: project.description || '',
    problemStatement: project.problemStatement || '',
    solution: project.solution || '',
    category: project.category || '',
    teamMembers: Array.isArray(project.teamMembers)
      ? project.teamMembers
      : typeof project.teamMembers === 'string'
      ? project.teamMembers.split(',').map((member) => member.trim()).filter(Boolean)
      : [],
    stage: project.stage || '',
    projectImage: project.projectImage || project.image || '',
    createdBy: project.createdBy || '',
    status: project.status || '',
    createdAt: project.createdAt || '',
  };
}

async function listProjects() {
  const response = await listDocuments(getCollectionId());
  const documents = Array.isArray(response.documents) ? response.documents : [];
  return documents.map(normalizeProject);
}

async function createProject(payload) {
  const projectData = {
    title: payload.title || payload.name || '',
    description: payload.description || '',
    problemStatement: payload.problemStatement || '',
    solution: payload.solution || '',
    category: payload.category || '',
    teamMembers: Array.isArray(payload.teamMembers)
      ? payload.teamMembers
      : typeof payload.teamMembers === 'string'
      ? payload.teamMembers.split(',').map((member) => member.trim()).filter(Boolean)
      : [],
    stage: payload.stage || '',
    projectImage: payload.projectImage || payload.image || '',
    createdBy: payload.createdBy || '',
    status: payload.status || 'Active',
    createdAt: payload.createdAt || new Date().toISOString(),
  };
  return normalizeProject(await createDocument(getCollectionId(), projectData));
}

async function getProject(documentId) {
  return getDocument(getCollectionId(), documentId);
}

async function updateProject(documentId, payload) {
  return updateDocument(getCollectionId(), documentId, payload);
}

module.exports = {
  listProjects,
  createProject,
  getProject,
  updateProject,
};
