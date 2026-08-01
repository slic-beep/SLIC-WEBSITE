const path = require('path');
 require('dotenv').config({ path: path.join(__dirname, '../.env') });

const { getAppwriteConfig } = require('../lib/appwrite/client');
const { ID } = require('node-appwrite');

const config = getAppwriteConfig();

async function ensureDatabase() {
  if (config.databaseId) {
    console.log(`Using existing Appwrite database: ${config.databaseId}`);
    return true;
  }

  const response = await fetch(`${config.endpoint}/databases`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Appwrite-Project': config.projectId,
      'X-Appwrite-Key': config.apiKey,
    },
    body: JSON.stringify({
      databaseId: 'slic-ecosystem',
      name: 'SLIC Ecosystem',
    }),
  });

  const text = await response.text();
  if (!response.ok) {
    const payload = text ? JSON.parse(text) : null;
    if (response.status === 409 || payload?.code === 409) {
      console.log('Database already exists, continuing…');
      return true;
    }
    console.error('Failed creating database:', text);
    return false;
  }

  return true;
}

async function createCollection(collectionId, name, attributes, indexes = []) {
  const response = await fetch(`${config.endpoint}/databases/${config.databaseId}/collections`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Appwrite-Project': config.projectId,
      'X-Appwrite-Key': config.apiKey,
    },
    body: JSON.stringify({
      collectionId,
      name,
      attributes,
      indexes,
      documentSecurity: true,
    }),
  });

  const text = await response.text();
  if (!response.ok) {
    const payload = text ? JSON.parse(text) : null;
    if (response.status === 409 || payload?.code === 409) {
      console.log(`Collection already exists: ${collectionId}`);
      return true;
    }
    console.error(`Failed creating ${name}:`, text);
    return null;
  }

  return JSON.parse(text);
}

async function main() {
  if (!config.apiKey || !config.projectId) {
    console.error('Missing Appwrite credentials in environment.');
    process.exit(1);
  }

  const databaseReady = await ensureDatabase();
  if (!databaseReady) {
    process.exit(1);
  }

  const collections = [
    {
      collectionId: ID.unique(),
      name: 'members',
      attributes: [
        { key: 'userId', type: 'string', size: 128, required: true, array: false, default: null },
        { key: 'fullName', type: 'string', size: 255, required: true },
        { key: 'email', type: 'string', size: 255, required: true },
        { key: 'phoneNumber', type: 'string', size: 32, required: false },
        { key: 'studentId', type: 'string', size: 64, required: false },
        { key: 'faculty', type: 'string', size: 128, required: false },
        { key: 'course', type: 'string', size: 128, required: false },
        { key: 'yearOfStudy', type: 'string', size: 32, required: false },
        { key: 'membershipType', type: 'string', size: 64, required: false },
        { key: 'profileImage', type: 'string', size: 512, required: false },
        { key: 'bio', type: 'string', size: 2000, required: false },
        { key: 'skills', type: 'string', size: 1000, required: false, array: true },
        { key: 'interests', type: 'string', size: 1000, required: false, array: true },
        { key: 'role', type: 'string', size: 64, required: false },
        { key: 'status', type: 'string', size: 32, required: false },
        { key: 'createdAt', type: 'datetime', required: false },
      ],
      indexes: [
        { key: 'userId_index', type: 'unique', attributes: ['userId'] },
        { key: 'email_index', type: 'key', attributes: ['email'] },
        { key: 'status_index', type: 'key', attributes: ['status'] },
      ],
    },
    {
      collectionId: ID.unique(),
      name: 'projects',
      attributes: [
        { key: 'title', type: 'string', size: 255, required: true },
        { key: 'description', type: 'string', size: 4000, required: false },
        { key: 'problemStatement', type: 'string', size: 4000, required: false },
        { key: 'solution', type: 'string', size: 4000, required: false },
        { key: 'category', type: 'string', size: 128, required: false },
        { key: 'teamMembers', type: 'string', size: 1000, required: false, array: true },
        { key: 'stage', type: 'string', size: 64, required: false },
        { key: 'projectImage', type: 'string', size: 512, required: false },
        { key: 'status', type: 'string', size: 32, required: false },
        { key: 'createdBy', type: 'string', size: 128, required: false },
        { key: 'createdAt', type: 'datetime', required: false },
      ],
      indexes: [
        { key: 'status_index', type: 'key', attributes: ['status'] },
        { key: 'stage_index', type: 'key', attributes: ['stage'] },
      ],
    },
    {
      collectionId: ID.unique(),
      name: 'events',
      attributes: [
        { key: 'title', type: 'string', size: 255, required: true },
        { key: 'description', type: 'string', size: 4000, required: false },
        { key: 'eventType', type: 'string', size: 64, required: false },
        { key: 'date', type: 'datetime', required: false },
        { key: 'time', type: 'string', size: 64, required: false },
        { key: 'location', type: 'string', size: 255, required: false },
        { key: 'bannerImage', type: 'string', size: 512, required: false },
        { key: 'registrationLink', type: 'string', size: 512, required: false },
        { key: 'maxParticipants', type: 'integer', required: false },
        { key: 'status', type: 'string', size: 32, required: false },
        { key: 'createdAt', type: 'datetime', required: false },
      ],
      indexes: [{ key: 'status_index', type: 'key', attributes: ['status'] }],
    },
    {
      collectionId: ID.unique(),
      name: 'programs',
      attributes: [
        { key: 'title', type: 'string', size: 255, required: true },
        { key: 'description', type: 'string', size: 4000, required: false },
        { key: 'category', type: 'string', size: 128, required: false },
        { key: 'duration', type: 'string', size: 64, required: false },
        { key: 'thumbnail', type: 'string', size: 512, required: false },
        { key: 'requirements', type: 'string', size: 4000, required: false },
        { key: 'status', type: 'string', size: 32, required: false },
        { key: 'createdAt', type: 'datetime', required: false },
      ],
      indexes: [{ key: 'status_index', type: 'key', attributes: ['status'] }],
    },
    {
      collectionId: ID.unique(),
      name: 'applications',
      attributes: [
        { key: 'applicantId', type: 'string', size: 128, required: true },
        { key: 'applicationType', type: 'string', size: 64, required: true },
        { key: 'name', type: 'string', size: 255, required: false },
        { key: 'email', type: 'string', size: 255, required: false },
        { key: 'program', type: 'string', size: 255, required: false },
        { key: 'data', type: 'string', size: 8000, required: false },
        { key: 'status', type: 'string', size: 32, required: false },
        { key: 'reviewedBy', type: 'string', size: 128, required: false },
        { key: 'submittedAt', type: 'datetime', required: false },
        { key: 'createdAt', type: 'datetime', required: false },
      ],
      indexes: [{ key: 'status_index', type: 'key', attributes: ['status'] }],
    },
    {
      collectionId: ID.unique(),
      name: 'partners',
      attributes: [
        { key: 'name', type: 'string', size: 255, required: true },
        { key: 'logo', type: 'string', size: 512, required: false },
        { key: 'description', type: 'string', size: 4000, required: false },
        { key: 'website', type: 'string', size: 512, required: false },
        { key: 'category', type: 'string', size: 128, required: false },
        { key: 'status', type: 'string', size: 32, required: false },
        { key: 'createdAt', type: 'datetime', required: false },
      ],
      indexes: [{ key: 'status_index', type: 'key', attributes: ['status'] }],
    },
    {
      collectionId: ID.unique(),
      name: 'announcements',
      attributes: [
        { key: 'title', type: 'string', size: 255, required: true },
        { key: 'message', type: 'string', size: 4000, required: false },
        { key: 'type', type: 'string', size: 64, required: false },
        { key: 'image', type: 'string', size: 512, required: false },
        { key: 'createdBy', type: 'string', size: 128, required: false },
        { key: 'createdAt', type: 'datetime', required: false },
      ],
      indexes: [{ key: 'type_index', type: 'key', attributes: ['type'] }],
    },
    {
      collectionId: ID.unique(),
      name: 'hero-images',
      attributes: [
        { key: 'title', type: 'string', size: 255, required: false },
        { key: 'caption', type: 'string', size: 1000, required: false },
        { key: 'imageUrl', type: 'string', size: 512, required: true },
        { key: 'order', type: 'integer', required: false },
        { key: 'status', type: 'string', size: 32, required: false },
        { key: 'createdAt', type: 'datetime', required: false },
      ],
      indexes: [{ key: 'order_index', type: 'key', attributes: ['order'] }],
    },
    {
      collectionId: ID.unique(),
      name: 'impact-metrics',
      attributes: [
        { key: 'label', type: 'string', size: 255, required: true },
        { key: 'value', type: 'integer', required: false },
        { key: 'suffix', type: 'string', size: 32, required: false },
        { key: 'order', type: 'integer', required: false },
        { key: 'status', type: 'string', size: 32, required: false },
        { key: 'createdAt', type: 'datetime', required: false },
      ],
      indexes: [{ key: 'order_index', type: 'key', attributes: ['order'] }],
    },
    {
      collectionId: ID.unique(),
      name: 'reports',
      attributes: [
        { key: 'month', type: 'string', size: 64, required: true },
        { key: 'activities', type: 'string', size: 4000, required: false },
        { key: 'membersReached', type: 'integer', required: false },
        { key: 'projectsCreated', type: 'integer', required: false },
        { key: 'eventsHeld', type: 'integer', required: false },
        { key: 'partnerships', type: 'integer', required: false },
        { key: 'financialSummary', type: 'string', size: 2000, required: false },
        { key: 'createdAt', type: 'datetime', required: false },
      ],
      indexes: [{ key: 'month_index', type: 'key', attributes: ['month'] }],
    },
  ];

  for (const collection of collections) {
    const created = await createCollection(collection.collectionId, collection.name, collection.attributes, collection.indexes);
    if (created) {
      console.log(`Created or confirmed collection: ${collection.collectionId}`);
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
