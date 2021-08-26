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
    const sauceObject = req.file ? { // y'a t-il une new image ? 
        ...req.body, // chaine de caractère parsée en objet avec json
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

exports.likeSauce = (req, res, next) => { // on va chercher la route 
// switch évalue une expression et selon résultat et le "case", exécute les instructions correspondantes
    switch (req.body.like) { // on va chercher si like ? 
        
        // Dislike
        case -1: 
        // méthode updateOne pour modifier sauce avec id correspondant - opérateur push pour ajouter like d'un utilisateur donné au tableau mongoose 
        Sauce.updateOne({ _id: req.params.id }, { $push: { usersDisliked: req.body.userId }, $inc: { dislikes: 1 } }) // l'opérateur mongoose $inc incrémente un champs avec une valeur donnée
            .then(() => res.status(200).json({ message: "Je n'aime pas cette sauce !" }))
            .catch(error => res.status(400).json({ error }));
        break; // termine la boucle
        
        // Like
        case 1:
        Sauce.updateOne({ _id: req.params.id }, { $push: { usersLiked: req.body.userId }, $inc: { likes: 1 } })
            .then(() => res.status(200).json({ message: "J'aime cette sauce ! " }))
            .catch(error => res.status(400).json({ error }));
        break;
        
        //Unlike/undislike
        case 0:
            // méthode findOne pour trouver la sauce avec id identique au paramètre de requête
        Sauce.findOne({ _id: req.params.id })
            .then((sauce) => {
                // méthode find pour trouver dans le model sauce / rangée dislike
            if (sauce.usersDisliked.find(user => user === req.body.userId)) { // si user donne pour résultat des données identiques au userID
                Sauce.updateOne({ _id: req.params.id }, { $pull: { usersDisliked: req.body.userId }, $inc: { dislikes: -1 } })
                .then(() => res.status(201).json({ message: 'Modification effectuée !' }))
                .catch(error => res.status(400).json({ error }));
            }
            if (sauce.usersLiked.find(user => user === req.body.userId)) {
                Sauce.updateOne({ _id: req.params.id }, { $pull: { usersLiked: req.body.userId }, $inc: { likes: -1 } })
                    .then(() => res.status(201).json({ message: 'Modification effectuée !' }))
                    .catch(error => res.status(400).json({ error }));
            }
        })
        .catch(error => res.status(400).json({ error }));
        break;

        default:
        console.error("Il y a eu un problème lors de votre requête, veillez réessayer");
        break;

    }
}