// logique métier des routes

// imports
const Sauce = require('../models/sauces.model'); 
const fs = require('fs'); 

// fonctions des routes
exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce); 
    const imageUrl = req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null; 
    sauceObject.userId = req.userId;
    sauceObject.imageUrl = imageUrl;
    sauceObject.likes = 0; 
    sauceObject.dislikes = 0;
    sauceObject.usersLiked = []; 
    sauceObject.usersDisliked = [];
    const sauce = new Sauce(sauceObject);
    sauce.save() 
        .then(() => res.status(201).json({ message: 'Sauce enregistrée !' })) 
        .catch(error => res.status(400).json({ error })); 
};

exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ? {  
        ...req.body, 
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`   
    } : { ...req.body };
    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id }) 
        .then(() => res.status(200).json({ message: 'Sauce modifiée !' }))
        .catch(error => res.status(400).json({ error }));
};


exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id }) 
        .then(sauce => { 
            const filename = sauce.imageUrl?.split('/images/')[1]; 
            if (filename) {               
                fs.unlink(`images/${filename}`, () => {       
                });
            }
            Sauce.deleteOne({ _id: req.params.id }) 
                .then(() => res.status(200).json({ message: 'Sauce supprimée !' })) 
                .catch(error => res.status(400).json({ error })); 
        })
        .catch(error => res.status(500).json({ error }));
};

exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id }) 
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({ error }));
};

exports.getAllSauces = (req, res, next) => {
    Sauce.find() 
        .then(sauce => res.status(200).json(sauce)) 
        .catch(error => res.status(400).json({ error }));
};

exports.likeSauce = (req, res, next) => { 
    switch (req.body.like) { 

        // Dislike
        case -1: 
        Sauce.updateOne({ _id: req.params.id }, { $push: { usersDisliked: req.body.userId }, $inc: { dislikes: 1 } }) 
            .then(() => res.status(200).json({ message: "Je n'aime pas cette sauce !" }))
            .catch(error => res.status(400).json({ error }));
        break; 
        
        // Like
        case 1:
        Sauce.updateOne({ _id: req.params.id }, { $push: { usersLiked: req.body.userId }, $inc: { likes: 1 } })
            .then(() => res.status(200).json({ message: "J'aime cette sauce ! " }))
            .catch(error => res.status(400).json({ error }));
        break;
        
        //Unlike/undislike
        case 0:
        Sauce.findOne({ _id: req.params.id })
            .then((sauce) => {
            if (sauce.usersDisliked.find(user => user === req.body.userId)) { 
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