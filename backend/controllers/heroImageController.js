const { listHeroImages, createHeroImage, getHeroImage, updateHeroImage, deleteHeroImage } = require('../services/heroImageService');

async function listHeroImagesHandler(req, res) {
  try {
    const heroImages = await listHeroImages();
    res.json({ success: true, data: heroImages });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

async function createHeroImageHandler(req, res) {
  try {
    const heroImage = await createHeroImage(req.body);
    res.status(201).json({ success: true, data: heroImage });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
}

async function getHeroImageHandler(req, res) {
  try {
    const heroImage = await getHeroImage(req.params.id);
    res.json({ success: true, data: heroImage });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
}

async function updateHeroImageHandler(req, res) {
  try {
    const heroImage = await updateHeroImage(req.params.id, req.body);
    res.json({ success: true, data: heroImage });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
}

async function deleteHeroImageHandler(req, res) {
  try {
    await deleteHeroImage(req.params.id);
    res.json({ success: true, data: null });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
}

module.exports = {
  listHeroImagesHandler,
  createHeroImageHandler,
  getHeroImageHandler,
  updateHeroImageHandler,
  deleteHeroImageHandler,
};
