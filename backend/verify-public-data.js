const { listEvents } = require('./services/eventService');
const { listPartners } = require('./services/partnerService');

async function main() {
  const events = await listEvents();
  const statuses = {};
  events.forEach((event) => {
    const status = String(event.status || '(empty)');
    statuses[status] = (statuses[status] || 0) + 1;
  });
  console.log('EVENTS count:', events.length);
  console.log('EVENTS statuses:', JSON.stringify(statuses, null, 2));

  try {
    const partners = await listPartners();
    console.log('PARTNERS count:', partners.length);
    console.log('PARTNERS sample:', JSON.stringify(partners[0] || null, null, 2));
  } catch (error) {
    console.error('PARTNERS ERROR:', error.message);
  }

  process.exit(0);
}

main().catch((error) => {
  console.error('ERROR:', error.message);
  process.exit(1);
});
