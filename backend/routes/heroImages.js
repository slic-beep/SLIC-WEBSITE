var express = require('express');
var router = express.Router();
var { listHeroImagesHandler, createHeroImageHandler, getHeroImageHandler, updateHeroImageHandler, deleteHeroImageHandler } = require('../controllers/heroImageController');

router.get('/', listHeroImagesHandler);
router.post('/', createHeroImageHandler);
router.get('/:id', getHeroImageHandler);
router.put('/:id', updateHeroImageHandler);
router.delete('/:id', deleteHeroImageHandler);

module.exports = router;
