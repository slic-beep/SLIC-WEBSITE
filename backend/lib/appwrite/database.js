const { Client, Databases } = require('node-appwrite');
const { getAppwriteConfig } = require('./client');

function getDatabasesClient() {
  const { endpoint, projectId, apiKey } = getAppwriteConfig();
  const client = new Client();
  client.setEndpoint(endpoint).setProject(projectId).setKey(apiKey);
  return new Databases(client);
}

async function listDocuments(collectionId, queries = [], sessionToken = null) {
  const { databaseId } = getAppwriteConfig();
  const databases = getDatabasesClient();
  return databases.listDocuments(databaseId, collectionId, queries);
}

async function getDocument(collectionId, documentId, sessionToken = null) {
  const { databaseId } = getAppwriteConfig();
  const databases = getDatabasesClient();
  return databases.getDocument(databaseId, collectionId, documentId);
}

async function createDocument(collectionId, payload, sessionToken = null) {
  const { databaseId } = getAppwriteConfig();
  const databases = getDatabasesClient();
  return databases.createDocument(databaseId, collectionId, 'unique()', payload);
}

async function updateDocument(collectionId, documentId, payload, sessionToken = null) {
  const { databaseId } = getAppwriteConfig();
  const databases = getDatabasesClient();
  return databases.updateDocument(databaseId, collectionId, documentId, payload);
}

async function deleteDocument(collectionId, documentId, sessionToken = null) {
  const { databaseId } = getAppwriteConfig();
  const databases = getDatabasesClient();
  return databases.deleteDocument(databaseId, collectionId, documentId);
}

module.exports = {
  listDocuments,
  getDocument,
  createDocument,
  updateDocument,
  deleteDocument,
};
