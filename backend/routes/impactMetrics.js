var express = require('express');
var router = express.Router();
var { listImpactMetricsHandler, createImpactMetricHandler, getImpactMetricHandler, updateImpactMetricHandler, deleteImpactMetricHandler } = require('../controllers/impactMetricController');

router.get('/', listImpactMetricsHandler);
router.post('/', createImpactMetricHandler);
router.get('/:id', getImpactMetricHandler);
router.put('/:id', updateImpactMetricHandler);
router.delete('/:id', deleteImpactMetricHandler);

module.exports = router;
