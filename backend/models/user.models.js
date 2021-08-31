// imports
const mongoose = require('mongoose');
const uniqueValidator = require ('mongoose-unique-validator'); 

// création du schéma de données pour chaque utilisateur
const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}) 

// méthode uniqueValidator appliquée au schéma
userSchema.plugin(uniqueValidator);

// export du schéma comme modèle Mongoose 
module.exports = mongoose.model('User', userSchema);