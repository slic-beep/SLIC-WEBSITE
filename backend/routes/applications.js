var express = require('express');
var router = express.Router();
var { getApplications, createApplicationHandler, getApplicationHandler, updateApplicationHandler } = require('../controllers/applicationController');
var { validateApplicationPayload, validateApplicationUpdate } = require('../middleware/validation');

router.get('/', getApplications);
router.post('/', validateApplicationPayload, createApplicationHandler);
router.get('/:id', getApplicationHandler);
router.patch('/:id', validateApplicationUpdate, updateApplicationHandler);

module.exports = router;
