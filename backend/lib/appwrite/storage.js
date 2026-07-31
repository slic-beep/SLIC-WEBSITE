const { appwriteRequest, getAppwriteConfig } = require('./client');

async function createFile(bucketId, fileBuffer, filename, mimeType, permissions = [], sessionToken = null) {
  const { endpoint, projectId, apiKey } = getAppwriteConfig();
  const formData = new FormData();
  const file = new Blob([fileBuffer], { type: mimeType });
  formData.append('file', file, filename);
  formData.append('permissions', JSON.stringify(permissions));

  const headers = {
    'X-Appwrite-Project': projectId,
    ...(apiKey ? { 'X-Appwrite-Key': apiKey } : {}),
    ...(sessionToken ? { 'X-Appwrite-Session': sessionToken } : {}),
  };

  const response = await fetch(`${endpoint}/storage/buckets/${bucketId}/files`, {
    method: 'POST',
    headers,
    body: formData,
  });

  const text = await response.text();
  let payload = null;
  if (text) {
    try {
      payload = JSON.parse(text);
    } catch (error) {
      payload = text;
    }
  }

  if (!response.ok) {
    const message = payload && payload.message ? payload.message : 'File upload failed';
    const error = new Error(message);
    error.status = response.status;
    error.payload = payload;
    throw error;
  }

  return payload;
}

async function getFilePreview(bucketId, fileId, width = 400, height = 400) {
  const { endpoint, projectId, apiKey } = getAppwriteConfig();
  const response = await fetch(`${endpoint}/storage/buckets/${bucketId}/files/${fileId}/preview?width=${width}&height=${height}`, {
    headers: {
      'X-Appwrite-Project': projectId,
      ...(apiKey ? { 'X-Appwrite-Key': apiKey } : {}),
    },
  });

  return response;
}

module.exports = {
  createFile,
  getFilePreview,
};
