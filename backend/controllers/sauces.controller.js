// fichier contenant "logique métier"

const Sauce = require('../models/sauces.models'); // import de Sauce (models, sauceSchema...)

// fonctions des routes
exports.createSauce = (req, res, next) => {
    const sauce = new Sauce({ // instance de Sauce (sauceSchema) avec objet JS contenant toutes les infos
        ...req.body // spread '...' = pour copier tous les éléments de req.body (sauceSchema)
    });
    sauce.save() // méthode 'save' = enregistre objet dans bdd et renvoie promise
    .then(() => res.status(201).json({ message: 'Sauce enregistrée !'})) // code si ok
    .catch(error => res.status(400).json({ error }));; // code si erreur
};

exports.modifySauce = (req, res, next) => {
    sauce.updateOne({ _id: req.parames.id }, { ...req.body, _id: req.params.id}) // méthode updateOne pour modifier avec id correspondant
    .then(() => res.status(200).json({ message: 'Sauce modifiée !'}))
    .catch(error => res.status(400).json({ error}));
};

exports.deleteSauce = (req, res, next) => {
    sauce.deleteOne({ _id: req.params.id}, { ...req.body, _id: req.params.id})
    .then(() => res.status(200).json({ message : 'Sauce supprimée !'}))
    .catch(error => res.status(400).json({ error }));
};

exports.getOneSauce = (req, res, next)=> {
    sauce.findOne({ _id: req.params.id}) // méthode findOne pour trouver 1 seule sauce avec id ideentique au paramètre de requête
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(404).json({ error }));
}; 

exports.getAllSauces = (req, res, next) => { 
    sauce.find() // méthode = pour trouver objet ou liste
    .then(sauce => res.status(200).json(sauce)) // promise récupère tableau de sauces
    .catch(error => res.status(400).json({ error})); // block erreur
};