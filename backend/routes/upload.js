var express = require('express');
var router = express.Router();
var { uploadFileHandler } = require('../controllers/uploadController');

router.post('/', uploadFileHandler);

module.exports = router;
