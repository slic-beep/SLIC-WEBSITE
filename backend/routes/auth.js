var express = require('express');
var router = express.Router();
var { loginHandler, sessionHandler, logoutHandler, registerHandler } = require('../controllers/authController');

router.post('/register', registerHandler);
router.post('/login', loginHandler);
router.get('/session', sessionHandler);
router.post('/logout', logoutHandler);

module.exports = router;
