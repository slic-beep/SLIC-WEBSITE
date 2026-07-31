const { listPartners, createPartner, getPartner, updatePartner } = require('../services/partnerService');

async function listPartnersHandler(req, res) {
  try {
    const partners = await listPartners();
    res.json({ success: true, data: partners });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

async function createPartnerHandler(req, res) {
  try {
    const partner = await createPartner(req.body);
    res.status(201).json({ success: true, data: partner });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
}

async function getPartnerHandler(req, res) {
  try {
    const partner = await getPartner(req.params.id);
    res.json({ success: true, data: partner });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
}

async function updatePartnerHandler(req, res) {
  try {
    const partner = await updatePartner(req.params.id, req.body);
    res.json({ success: true, data: partner });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
}

module.exports = {
  listPartnersHandler,
  createPartnerHandler,
  getPartnerHandler,
  updatePartnerHandler,
};
