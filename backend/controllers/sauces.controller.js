// logique métier pour les routes

// imports
const Sauce = require('../models/sauces.model'); // Sauce (model sauceSchema)
const fs = require('fs'); // package file système (pour accès au système de fichier)

// fonctions des routes
exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce); // trad de sauce
    const imageUrl = req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null; // si image va récupèrer segment de base de l'url serveur + génère url de l'image
    sauceObject.userId = req.userId;
    sauceObject.imageUrl = imageUrl;
    const sauce = new Sauce(sauceObject);
    sauce.save() // méthode save = enregistre objet dans bdd et renvoie promise
        .then(() => res.status(201).json({ message: 'Sauce enregistrée !' })) // code si ok
        .catch(error => res.status(400).json({ error })); // code si erreur
};

exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ? // y'a t-il une new image ?
        {
            ...req.body, // chaine de caracrtère parsée en objet avec json
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`// genère l'image url
        } : { ...req.body };
    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id }) // méthode updateOne pour modifier avec id correspondant
        .then(() => res.status(200).json({ message: 'Sauce modifiée !' }))
        .catch(error => res.status(400).json({ error }));
};

exports.deleteSauce = (req, res, next) => {

    Sauce.findOne({ _id: req.params.id }) // chercher l'objet dans bdd grâce aux params de l'id
        .then(sauce => { // quand trouvé

            const filename = sauce.imageUrl?.split('/images/')[1]; // extraction de l'objet avec split
            if (filename) {
                
                fs.unlink(`images/${filename}`, () => { // fonction unlink pour supprimer avec lien du package fs
                    
                });
            }
            Sauce.deleteOne({ _id: req.params.id }) // callback = spprimer fichier après l'avoir retrouvé
                        .then(() => res.status(200).json({ message: 'Sauce supprimée !' })) // message si ok
                        .catch(error => res.status(400).json({ error })); // message si invalide
        })
        .catch(error => res.status(500).json({ error })); // si erreur
};


exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id }) // méthode findOne pour trouver 1 seule sauce avec id identique au paramètre de requête
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({ error }));
};

exports.getAllSauces = (req, res, next) => {
    Sauce.find() // méthode = pour trouver objet ou liste
        .then(sauce => res.status(200).json(sauce)) // promise récupère tableau de sauces
        .catch(error => res.status(400).json({ error })); // block erreur
};