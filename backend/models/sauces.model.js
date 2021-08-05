const mongoose = require('mongoose'); // import de mongoose (bdd)

// création d'un schéma de données contenant champs souhaités pour chaque sauce
const sauceSchema = mongoose.Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    manufacturer: { type: String, required: true },
    description: { type: String, required: true },
    mainPepper: { type: String, required: true },
    imageUrl: { type: String, required: true },
    heat: { type: Number, required: true },
    likes: { type: Number, required: true },
    dislikes: { type: Number, required: true },
    usersLiked: { type: Array, required: false },
    usersDisliked: { type: Array, required: false },
})

//  export du schéma comme modèle Mongoose appelé « Sauce »
module.exports = mongoose.model('Sauce', sauceSchema);