var express = require('express');
var router = express.Router();
var { getMembers, createMemberHandler, getMemberHandler, updateMemberHandler, getProfileHandler } = require('../controllers/memberController');
var { validateMemberPayload } = require('../middleware/validation');

router.get('/', getMembers);
router.post('/', validateMemberPayload, createMemberHandler);
router.get('/profile', getProfileHandler);
router.get('/:id', getMemberHandler);
router.patch('/:id', updateMemberHandler);

module.exports = router;
