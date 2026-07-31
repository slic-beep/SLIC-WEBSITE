const { listApplications, createApplication, getApplication, updateApplication } = require('../services/applicationService');

async function getApplications(req, res) {
  try {
    const applications = await listApplications();
    res.json({ success: true, data: applications });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

async function createApplicationHandler(req, res) {
  try {
    const application = await createApplication(req.body);
    res.status(201).json({ success: true, data: application });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
}

async function getApplicationHandler(req, res) {
  try {
    const application = await getApplication(req.params.id);
    res.json({ success: true, data: application });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
}

async function updateApplicationHandler(req, res) {
  try {
    const application = await updateApplication(req.params.id, req.body);
    res.json({ success: true, data: application });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
}

module.exports = {
  getApplications,
  createApplicationHandler,
  getApplicationHandler,
  updateApplicationHandler,
};
