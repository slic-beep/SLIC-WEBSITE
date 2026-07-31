var express = require('express');
var router = express.Router();
var { listPrograms, createProgramHandler, getProgramHandler, updateProgramHandler } = require('../controllers/programController');

router.get('/', listPrograms);
router.post('/', createProgramHandler);
router.get('/:id', getProgramHandler);
router.patch('/:id', updateProgramHandler);

module.exports = router;
