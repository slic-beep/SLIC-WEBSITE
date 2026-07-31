const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const { listDocuments, updateDocument } = require('./lib/appwrite/database');
const { getAppwriteConfig } = require('./lib/appwrite/client');

async function main() {
  const config = getAppwriteConfig();
  const response = await listDocuments(config.collectionIds.events);
  const documents = response.documents || [];
  const now = new Date();
  let updated = 0;

  for (const event of documents) {
    const eventDate = event.date ? new Date(event.date) : null;
    const newStatus = eventDate && eventDate >= now ? 'Upcoming' : 'Past';
    if (event.status !== newStatus) {
      await updateDocument(config.collectionIds.events, event.$id, { status: newStatus });
      updated += 1;
    }
  }

  console.log(`Updated ${updated} of ${documents.length} events to Upcoming/Past based on event date.`);
  process.exit(0);
}

main().catch((error) => {
  console.error('ERROR:', error.message);
  process.exit(1);
});
