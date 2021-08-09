const bcrypt = require('bcrypt');
const Auth = require('../models/auth.models');

class AuthController {
    static signUp(req, res, next) {
        console.log(req.body)
        res.json({ message : "coucou ! "})
    }
}

// fonction pour l'enregistrement de new utilisateurs
exports.signUp = (req, res, next) => {
    bcrypt.hash(req.body.password, 10) //cryptage du mp
    .then(hash => {
        const auth = new Auth({ // créa d'un new user
            email: req.body.email,
            password: hash
        });
        auth.save()
        .then(() => res.status(201).json({ message: 'Utilistateur créé !'}))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

// fonction pour connexion des utilisateurs existants
exports.login = (req, res, next) => {
    auth.findOne({ email: req.body.email }) // récupération de l'utilisateur avec email
    .then( auth => {
        if (!auth) {
            return res.status(401).json({ error: 'Utilisateur non trouvé !'}); // si pas d'email trouvé erreur
        }
        bcrypt.compare(req.body.password, auth.password) // comparaison du mdp avec hash enregistré dans bdd
        .then(valid => {
            if (!valid) {
                return res.status(401).json({ error: 'Mot de passe non correct !'}); // si comparaison incorrecte = erreur
            }
            res.status(200).json({ // si comparaison correct : renvoie d'un auth id + token
                userId: auth._id,
                token:'TOKEN'
            })       
        })
        .catch(error => res.status(500).json({ error }))
    })
    .catch(error => res.status(500).json({ error }))
};

module.exports = AuthController;