const { listImpactMetrics, createImpactMetric, getImpactMetric, updateImpactMetric, deleteImpactMetric } = require('../services/impactMetricService');

async function listImpactMetricsHandler(req, res) {
  try {
    const impactMetrics = await listImpactMetrics();
    res.json({ success: true, data: impactMetrics });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

async function createImpactMetricHandler(req, res) {
  try {
    const impactMetric = await createImpactMetric(req.body);
    res.status(201).json({ success: true, data: impactMetric });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
}

async function getImpactMetricHandler(req, res) {
  try {
    const impactMetric = await getImpactMetric(req.params.id);
    res.json({ success: true, data: impactMetric });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
}

async function updateImpactMetricHandler(req, res) {
  try {
    const impactMetric = await updateImpactMetric(req.params.id, req.body);
    res.json({ success: true, data: impactMetric });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
}

async function deleteImpactMetricHandler(req, res) {
  try {
    await deleteImpactMetric(req.params.id);
    res.json({ success: true, data: null });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
}

module.exports = {
  listImpactMetricsHandler,
  createImpactMetricHandler,
  getImpactMetricHandler,
  updateImpactMetricHandler,
  deleteImpactMetricHandler,
};
