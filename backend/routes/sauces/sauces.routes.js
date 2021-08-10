const express = require('express'); // import du module Express
const router = express.Router(); // création d'un router avec méthode Router d'express
const saucesControllers = require('../../controllers/sauces.controller'); //import du module controller (la logique métier)
const auth = require('../middleware/auth'); // import du middleware d'authentification avant controllers 


// import des fonctions routes depuis controllers + ajout du middleware auth sur toutes les routes
router.post('/', auth, saucesControllers.createSauce); 
router.put('/:id', auth, saucesControllers.modifySauce);
router.delete('/:id', auth, saucesControllers.deleteSauce);
router.get('/:id', auth, saucesControllers.getOneSauce);
router.get('/', auth, saucesControllers.getAllSauces);

module.exports = router; // export du router du fichier (pour pouvoir l'utiliser ailleurs)