const path = require('path');
const fs = require('fs');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const { ID } = require('node-appwrite');
const { getAppwriteConfig } = require('../lib/appwrite/client');

const config = getAppwriteConfig();
const ENV_FILE = path.join(__dirname, '../.env');
const ENV_KEY = 'APPWRITE_COLLECTION_HERO_IMAGES_ID';

// Reuse an existing leadership collection if one is already recorded in .env,
// otherwise generate a fresh ID and persist it so the backend can find it.
function resolveCollectionId() {
  const existing = process.env[ENV_KEY];
  if (existing && existing.trim()) return existing.trim();
  return ID.unique();
}

function saveCollectionIdToEnv(collectionId) {
  let content = '';
  try { content = fs.readFileSync(ENV_FILE, 'utf8'); } catch { /* new file */ }
  const line = `${ENV_KEY}=${collectionId}`;
  if (content.includes(ENV_KEY)) {
    content = content.replace(new RegExp(`^${ENV_KEY}=.*$`, 'm'), line);
  } else {
    content = `${content.trim()}\n${line}\n`;
  }
  fs.writeFileSync(ENV_FILE, content);
}

const COLLECTION_ID = resolveCollectionId();
const COLLECTION_NAME = 'HeroImages';

async function request(url, method, body) {
  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'X-Appwrite-Project': config.projectId,
      'X-Appwrite-Key': config.apiKey,
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await response.text();
  let payload = null;
  try { payload = JSON.parse(text); } catch { payload = text; }
  return { status: response.status, payload };
}

async function ensureCollection() {
  const { status, payload } = await request(
    `${config.endpoint}/databases/${config.databaseId}/collections`,
    'POST',
    { collectionId: COLLECTION_ID, name: COLLECTION_NAME, documentSecurity: true }
  );
  if (status === 201) {
    saveCollectionIdToEnv(COLLECTION_ID);
    console.log(`Created collection: ${COLLECTION_ID}`);
    return true;
  }
  if (status === 409 || payload?.code === 409) {
    console.log(`Collection already exists: ${COLLECTION_ID}`);
    return true;
  }
  console.error('Failed creating collection:', JSON.stringify(payload, null, 2));
  return false;
}

const attributes = [
        { key: 'title', type: 'string', size: 255, required: false },
        { key: 'caption', type: 'string', size: 1000, required: false },
        { key: 'imageUrl', type: 'string', size: 512, required: true },
        { key: 'order', type: 'integer', required: false },
        { key: 'status', type: 'string', size: 32, required: false },
        { key: 'createdAt', type: 'datetime', required: false },
        

];


async function ensureAttributes() {
  for (const attr of attributes) {
    const { status, payload } = await request(
      `${config.endpoint}/databases/${config.databaseId}/collections/${COLLECTION_ID}/attributes/${attr.type}`,
      'POST',
      {
        key: attr.key,
        size: attr.size,
        required: attr.required,
        array: false,
        default: null,
      }
    );
    if (status === 201) {
      console.log(`  attribute created: ${attr.key} (${attr.type})`);
    } else if (status === 409 || payload?.code === 409) {
      console.log(`  attribute exists: ${attr.key}`);
    } else {
      console.warn(`  attribute failed ${attr.key}:`, status, JSON.stringify(payload).slice(0, 200));
    }
  }
}

async function main() {
  if (!config.apiKey || !config.projectId) {
    console.error('Missing Appwrite credentials.');
    process.exit(1);
  }
  const ok = await ensureCollection();
  if (!ok) process.exit(1);
  await ensureAttributes();
  console.log('Hero Images setup complete.');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
