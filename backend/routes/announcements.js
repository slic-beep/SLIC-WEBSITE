var express = require('express');
var router = express.Router();
var { getAnnouncements, getLatestAnnouncements, createAnnouncementHandler, getAnnouncementHandler, updateAnnouncementHandler } = require('../controllers/announcementController');

router.get('/', getAnnouncements);
router.get('/latest', getLatestAnnouncements);
router.post('/', createAnnouncementHandler);
router.get('/:id', getAnnouncementHandler);
router.patch('/:id', updateAnnouncementHandler);

module.exports = router;
