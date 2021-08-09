const router = require('express').Router(); // créa du router avec fonction Router d'express
const authController = require('../../controllers/auth.controller');

router.post('/signUp', authController.signUp);
router.post('/login', authController.login);

module.exports = router; // export du router