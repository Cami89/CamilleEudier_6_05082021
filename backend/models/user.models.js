const mongoose = require('mongoose');
const uniqueValidator = require ('mongoose-unique-validator'); // pour permettre un seul compte par email

const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}) 

// méthode uniqueValidator appliquée au schéma
userSchema.plugin(uniqueValidator);

//  export du schéma comme modèle Mongoose appelé « Auth »
module.exports = mongoose.model('User', userSchema);