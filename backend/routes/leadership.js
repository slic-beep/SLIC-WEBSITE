var express = require('express');
var router = express.Router();
var {
  getLeadership,
  getPublicLeadershipHandler,
  createLeaderHandler,
  getLeaderHandler,
  updateLeaderHandler,
  deleteLeaderHandler,
} = require('../controllers/leadershipController');

router.get('/', getLeadership);
router.get('/public', getPublicLeadershipHandler);
router.post('/', createLeaderHandler);
router.get('/:id', getLeaderHandler);
router.patch('/:id', updateLeaderHandler);
router.delete('/:id', deleteLeaderHandler);

module.exports = router;
