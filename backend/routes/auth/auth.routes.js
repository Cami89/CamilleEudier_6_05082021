const router = require('express').Router();
const AuthController = require('../../controllers/auth.controller');
router.post('/signup', AuthController.signUp);

module.exports = router;