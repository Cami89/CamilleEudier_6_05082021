const express = require('express'); // import du module Express
const router = express.Router(); // création d'un router avec méthode Router d'express
const saucesControllers = require('../../controllers/sauces.controller'); //import du module controller (la logique métier)
const auth = require('../../middleware/auth'); // import du middleware d'authentification
const multer = require('../../middleware/multer-config'); // import middleware multer pour fichiers

// import des fonctions routes depuis controllers + ajout de auth sur toutes les routes avant controllers 
router.post('/', auth, multer, saucesControllers.createSauce); // + multer après auth
router.put('/:id', auth, multer, saucesControllers.modifySauce);
router.delete('/:id', auth, saucesControllers.deleteSauce);
router.get('/:id', auth, saucesControllers.getOneSauce);
router.get('/', auth, saucesControllers.getAllSauces);
router.post('/:id/like', auth, saucesControllers.likeSauce);

module.exports = router; // export du router du fichier (pour pouvoir l'utiliser ailleurs)