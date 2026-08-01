const assert = require('assert');
const { createEvent } = require('../services/eventService');

(async () => {
  const originalCreateDocument = require('../lib/appwrite/database').createDocument;
  require('../lib/appwrite/database').createDocument = async () => ({
    $id: 'event-1',
    title: 'Launch Meetup',
    description: 'A launch meetup',
    date: '2026-08-10',
    location: 'Campus Hall',
    status: 'Upcoming',
    time: '18:00',
    eventType: 'Workshop',
    bannerImage: 'https://example.com/banner.png',
    registrationLink: 'https://example.com/register',
    maxParticipants: 100,
  });

  const payload = {
    name: 'Launch Meetup',
    description: 'A launch meetup',
    eventType: 'Workshop',
    date: '2026-08-10',
    time: '18:00',
    location: 'Campus Hall',
    bannerImage: 'https://example.com/banner.png',
    registrationLink: 'https://example.com/register',
    maxParticipants: 100,
    status: 'Upcoming',
  };

  const result = await createEvent(payload);
  assert.strictEqual(result.time, '18:00');
  assert.strictEqual(result.eventType, 'Workshop');
  assert.strictEqual(result.bannerImage, 'https://example.com/banner.png');
  assert.strictEqual(result.registrationLink, 'https://example.com/register');
  assert.strictEqual(result.maxParticipants, 100);
  console.log('eventService test passed');
  require('../lib/appwrite/database').createDocument = originalCreateDocument;
})();
