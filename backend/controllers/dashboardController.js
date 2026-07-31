const { getDashboardOverview, getRecentActivities, getPendingApprovals } = require('../services/dashboardService');

async function getOverview(req, res) {
  try {
    const overview = await getDashboardOverview();
    res.json({ success: true, data: overview });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

module.exports = {
  getOverview,
};

async function getRecent(req, res) {
  try {
    const items = await getRecentActivities(10);
    res.json({ success: true, data: items });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

async function getPending(req, res) {
  try {
    const items = await getPendingApprovals(10);
    res.json({ success: true, data: items });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

module.exports = {
  getOverview,
  getRecent,
  getPending,
};
