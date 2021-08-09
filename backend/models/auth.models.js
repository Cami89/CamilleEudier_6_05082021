const mongoose = require('mongoose');
const uniqueValidator = require ('mongoose-unique-validator'); // pour permettre un seul compte par email

const authSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}) 

// méthode uniqueValidator appliquée au schéma
authSchema.plugin(uniqueValidator);

//  export du schéma comme modèle Mongoose appelé « Auth »
module.exports = mongoose.model('Auth', authSchema);