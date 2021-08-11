const jwt = require('jsonwebtoken'); // pour vérifier tokens

module.exports = (req, res, next) => {  // export du middleware
    try { 
      const token = req.headers.authorization.split(' ')[1]; // récupération du token dans le header autorisation
      const decodedToken = jwt.verify(token, 'PIiQUANTEp6op'); // décodage du token avec la clé secrette
      const userId = decodedToken.userId; // récupération du userid dans le token décodé
      if (req.body.userId && req.body.userId !== userId) { // si userid dans la requête et est différent
        throw 'Identifiant invalide'; // retour erreur
      } else { // si ok
        next(); // passage de la requête au middleware suivant
      }
    } catch { // si erreur
      res.status(401).json({
        error: new Error('Requête non valide')
      });
    }
  };