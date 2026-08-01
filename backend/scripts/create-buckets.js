const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const { getAppwriteConfig } = require('../lib/appwrite/client');

const config = getAppwriteConfig();

async function createBucket(id, name) {
  const response = await fetch(`${config.endpoint}/storage/buckets`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Appwrite-Project': config.projectId,
      'X-Appwrite-Key': config.apiKey,
    },
    body: JSON.stringify({
      bucketId: id,
      name,
      permissions: ['read("any")', 'write("users")'],
      fileSecurity: true,
      enabled: true,
    }),
  });

  const text = await response.text();
  if (!response.ok) {
    console.error(`Failed creating bucket ${id}:`, text);
    return null;
  }

  return JSON.parse(text);
}

async function main() {
  if (!config.apiKey || !config.projectId) {
    console.error('Missing Appwrite credentials in environment.');
    process.exit(1);
  }

  const buckets = [
    ['profile-images', 'Profile Images'],
    ['program-thumbnails', 'Program Thumbnails'],
  ];

  for (const [id, name] of buckets) {
    const created = await createBucket(id, name);
    if (created) {
      console.log(`Created bucket: ${id}`);
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
