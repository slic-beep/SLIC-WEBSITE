var express = require('express');
var router = express.Router();
var { getProjects, createProjectHandler, getProjectHandler, updateProjectHandler } = require('../controllers/projectController');
var { validateProjectPayload, validateProjectUpdate } = require('../middleware/validation');

router.get('/', getProjects);
router.post('/', validateProjectPayload, createProjectHandler);
router.get('/:id', getProjectHandler);
router.patch('/:id', validateProjectUpdate, updateProjectHandler);

module.exports = router;
