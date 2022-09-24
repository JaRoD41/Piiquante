const mongoose = require('mongoose');
//utilisation du module Mongoose pour gérer les échanges avec MongoDB

const uniqueValidator = require('mongoose-unique-validator');

//mise en place du schéma utilisateur
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true}
});

//obligation d'utilisateur unique pour MongoDB
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);