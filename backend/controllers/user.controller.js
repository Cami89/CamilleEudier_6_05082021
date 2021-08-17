const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // appel package pour créer et vérifier tokens

const User = require('../models/user.models');


class userController {
    static signUp(req, res, next) {
        bcrypt.hash(req.body.password, 10) //cryptage du mp
            .then(hash => {
                const user = new User({ // créa d'un new user
                    email: req.body.email,
                    password: hash
                });
                user.save()
                    .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                    .catch(error => res.status(400).json({ error }));
            })
            .catch(error => res.status(500).json({ error }));
    }
    static login(req, res, next) {
        User.findOne({ email: req.body.email }) // récupération de l'utilisateur avec email
            .then(user => {
                if (!user) {
                    return res.status(401).json({ error: 'Utilisateur non trouvé !' }); // erreur si pas d'email trouvé 
                }
                bcrypt.compare(req.body.password, user.password) // fonction "compare" de bcrypt comparaison du mdp avec hash enregistré dans bdd
                    .then(valid => {
                        if (!valid) {
                            return res.status(401).json({ error: 'Mot de passe non correct !' }); // si comparaison incorrecte = erreur
                        }
                        res.status(200).json({ // si comparaison correct : renvoie d'un user id + token
                            userId: user._id,
                            token: jwt.sign( // fonction sign de token = renvoie d'une chaîne encodée avec 3 arguments
                                { userId: user._id }, // objet avec identifiant de l'utilisateur 
                                'PIiQUANTEp6op', // clé secrette pour encodage
                                { expiresIn: '24h' } // configuartion avec expération dans 24h
                            )
                        });

                    })
                    .catch(error => res.status(500).json({ error }))
            })
            .catch(error => res.status(500).json({ error }))
    }
}


module.exports = userController;