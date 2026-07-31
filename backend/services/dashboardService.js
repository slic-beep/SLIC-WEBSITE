const { listDocuments } = require('../lib/appwrite/database');
const { getAppwriteConfig } = require('../lib/appwrite/client');

async function getDashboardOverview() {
  const config = getAppwriteConfig();
  const collections = [
    { key: 'members', id: config.collectionIds.members },
    { key: 'projects', id: config.collectionIds.projects },
    { key: 'events', id: config.collectionIds.events },
    { key: 'programs', id: config.collectionIds.programs },
    { key: 'partners', id: config.collectionIds.partners },
    { key: 'applications', id: config.collectionIds.applications },
  ].filter((collection) => collection.id);

  const results = await Promise.all(collections.map(async ({ key, id }) => {
    try {
      const response = await listDocuments(id);
      const count = typeof response.total === 'number'
        ? response.total
        : Array.isArray(response.documents)
        ? response.documents.length
        : 0;

      return { key, count };
    } catch (error) {
      return { key, count: 0 };
    }
  }));

  return results.reduce((acc, item) => {
    acc[item.key] = item.count;
    return acc;
  }, {});
}

module.exports = {
  getDashboardOverview,
};

async function getRecentActivities(limit = 10) {
  const config = getAppwriteConfig();
  const collections = [
    { key: 'members', id: config.collectionIds.members },
    { key: 'projects', id: config.collectionIds.projects },
    { key: 'events', id: config.collectionIds.events },
    { key: 'applications', id: config.collectionIds.applications },
    { key: 'partners', id: config.collectionIds.partners },
  ].filter((c) => c.id);

  const items = [];
  await Promise.all(collections.map(async ({ key, id }) => {
    try {
      const response = await listDocuments(id);
      const docs = Array.isArray(response.documents) ? response.documents : [];
      docs.forEach((doc) => {
        const title = doc.title || doc.name || doc.project || doc.name || '';
        const user = doc.createdBy || doc.name || doc.email || title || '';
        const time = doc.createdAt || doc.$createdAt || new Date().toISOString();
        items.push({ action: title ? `${title}` : key, user, time, type: key });
      });
    } catch (err) {
      // ignore per-collection errors
    }
  }));

  items.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());
  return items.slice(0, limit);
}

async function getPendingApprovals(limit = 10) {
  const config = getAppwriteConfig();
  const collections = [
    { key: 'projects', id: config.collectionIds.projects },
    { key: 'events', id: config.collectionIds.events },
    { key: 'applications', id: config.collectionIds.applications },
    { key: 'members', id: config.collectionIds.members },
    { key: 'programs', id: config.collectionIds.programs },
  ].filter((c) => c.id);

  const pending = [];
  await Promise.all(collections.map(async ({ key, id }) => {
    try {
      const response = await listDocuments(id);
      const docs = Array.isArray(response.documents) ? response.documents : [];
      docs.forEach((doc) => {
        if (doc.status && String(doc.status).toLowerCase() === 'pending') {
          const name = doc.title || doc.name || doc.project || '';
          const time = doc.createdAt || doc.$createdAt || new Date().toISOString();
          pending.push({ name, type: key, status: 'pending', time, id: doc.$id || doc.id || null });
        }
      });
    } catch (err) {
      // ignore
    }
  }));

  pending.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());
  return pending.slice(0, limit);
}

module.exports = {
  getDashboardOverview,
  getRecentActivities,
  getPendingApprovals,
};
