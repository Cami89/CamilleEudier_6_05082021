const express = require('express'); // import du module Express
const router = express.Router(); // création d'un router avec méthode Router d'express
const saucesControllers = require('../../controllers/sauces.controller'); //import du module controller (la logique métier)

// import des fonctions routes depuis controllers
router.post('/', saucesControllers.createSauce); 
router.put('/:id', saucesControllers.modifySauce);
router.delete('/:id', saucesControllers.deleteSauce);
router.get('/:id', saucesControllers.getOneSauce);
router.get('/', saucesControllers.getAllSauces);

module.exports = router; // export du router du fichier (pour pouvoir l'utiliser ailleurs)