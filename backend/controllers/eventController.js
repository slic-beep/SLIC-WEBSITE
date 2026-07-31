const { listEvents, createEvent, getEvent, updateEvent } = require('../services/eventService');

async function getEvents(req, res) {
  try {
    const events = await listEvents();
    res.json({ success: true, data: events });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

async function createEventHandler(req, res) {
  try {
    const event = await createEvent(req.body);
    res.status(201).json({ success: true, data: event });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
}

async function getEventHandler(req, res) {
  try {
    const event = await getEvent(req.params.id);
    res.json({ success: true, data: event });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
}

async function updateEventHandler(req, res) {
  try {
    const event = await updateEvent(req.params.id, req.body);
    res.json({ success: true, data: event });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
}

module.exports = {
  getEvents,
  createEventHandler,
  getEventHandler,
  updateEventHandler,
};
