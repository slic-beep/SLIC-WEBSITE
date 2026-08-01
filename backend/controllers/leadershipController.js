const {
  listLeadership,
  getPublicLeadership,
  createLeader,
  getLeader,
  updateLeader,
  deleteLeader,
} = require('../services/leadershipService');

async function getLeadership(req, res) {
  try {
    const members = await listLeadership();
    res.json({ success: true, data: members });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

async function getPublicLeadershipHandler(req, res) {
  try {
    const members = await getPublicLeadership();
    res.json({ success: true, data: members });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

async function createLeaderHandler(req, res) {
  try {
    const member = await createLeader(req.body);
    res.status(201).json({ success: true, data: member });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
}

async function getLeaderHandler(req, res) {
  try {
    const member = await getLeader(req.params.id);
    res.json({ success: true, data: member });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
}

async function updateLeaderHandler(req, res) {
  try {
    const member = await updateLeader(req.params.id, req.body);
    res.json({ success: true, data: member });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
}

async function deleteLeaderHandler(req, res) {
  try {
    const result = await deleteLeader(req.params.id);
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
}

module.exports = {
  getLeadership,
  getPublicLeadershipHandler,
  createLeaderHandler,
  getLeaderHandler,
  updateLeaderHandler,
  deleteLeaderHandler,
};
