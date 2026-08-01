var express = require('express');
var router = express.Router();

/* GET/HEAD home page. */
function sendHomeResponse(req, res) {
  res.status(200).json({
    success: true,
    message: 'SLIC backend is running',
    endpoints: {
      health: '/api/health',
      heroImages: '/api/hero-images',
      impactMetrics: '/api/impact-metrics',
    },
  });
}

router.get('/', sendHomeResponse);
router.head('/', function(req, res) {
  res.status(200).end();
});

module.exports = router;
