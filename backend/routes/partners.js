var express = require('express');
var router = express.Router();
var { listPartnersHandler, createPartnerHandler, getPartnerHandler, updatePartnerHandler } = require('../controllers/partnerController');
var { validatePartnerPayload, validatePartnerUpdate } = require('../middleware/validation');

router.get('/', listPartnersHandler);
router.post('/', validatePartnerPayload, createPartnerHandler);
router.get('/:id', getPartnerHandler);
router.patch('/:id', validatePartnerUpdate, updatePartnerHandler);

module.exports = router;
