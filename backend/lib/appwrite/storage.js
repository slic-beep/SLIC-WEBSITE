const { Client, Storage, ID } = require('node-appwrite');
const { InputFile } = require('node-appwrite/file');
const { getAppwriteConfig } = require('./client');

function getStorageClient() {
  const { endpoint, projectId, apiKey } = getAppwriteConfig();
  const client = new Client();
  client.setEndpoint(endpoint).setProject(projectId).setKey(apiKey);
  return new Storage(client);
}

async function createFile(bucketId, fileBuffer, filename, mimeType, permissions = [], sessionToken = null) {
  const { bucketIds } = getAppwriteConfig();
  const resolvedBucketId = bucketIds[bucketId] || bucketId;
  const storage = getStorageClient();
  const resolvedPermissions = Array.isArray(permissions) && permissions.length > 0
    ? permissions
    : ['read("any")'];

  const result = await storage.createFile(
    resolvedBucketId,
    ID.unique(),
    InputFile.fromBuffer(fileBuffer, filename),
    resolvedPermissions
  );

  const endpoint = getAppwriteConfig().endpoint.endsWith('/')
    ? getAppwriteConfig().endpoint
    : `${getAppwriteConfig().endpoint}/`;
  const url = `${endpoint}storage/buckets/${resolvedBucketId}/files/${result.$id}/view?project=${getAppwriteConfig().projectId}`;

  return { ...result, url };
}

async function getFilePreview(bucketId, fileId, width = 400, height = 400) {
  const { bucketIds } = getAppwriteConfig();
  const resolvedBucketId = bucketIds[bucketId] || bucketId;
  const storage = getStorageClient();
  return storage.getFilePreview(resolvedBucketId, fileId, width, height);
}

module.exports = {
  createFile,
  getFilePreview,
};
