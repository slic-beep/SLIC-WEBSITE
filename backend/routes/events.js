var express = require('express');
var router = express.Router();
var { getEvents, createEventHandler, getEventHandler, updateEventHandler } = require('../controllers/eventController');
var { validateEventPayload } = require('../middleware/validation');

router.get('/', getEvents);
router.post('/', validateEventPayload, createEventHandler);
router.get('/:id', getEventHandler);
router.patch('/:id', updateEventHandler);

module.exports = router;
