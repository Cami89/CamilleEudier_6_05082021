// créa du router avec fonction Router d'express
const router = require('express').Router();

// controller pour associer fonctions aux routes
const userController = require('../../controllers/user.controller'); 

// import des fonctions des routes
router.post('/signup', userController.signUp); 
router.post('/login', userController.login); 

// export du router
module.exports = router;  