const router = require('express').Router(); // créa du router avec fonction Router d'express
const userController = require('../../controllers/user.controller'); // controller pour associer fonctions aux routes

router.post('/signup', userController.signUp); // route avec méthode signup
router.post('/login', userController.login); // route avec fonction login

module.exports = router; // export du router