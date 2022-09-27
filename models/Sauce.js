const mongoose = require('mongoose');

//création du schema type de la sauce pour la base MongoDB

const sauceSchema = mongoose.Schema({
	userId: { type: String, required: true },
	name: { type: String, required: true },
	manufacturer: { type: String, required: true },
	description: { type: String, required: true },
	mainPepper: { type: String, required: true },
	imageUrl: { type: String, required: true }, 
	heat: { type: Number, required: true },
	//likes et dislikes
	likes: { type: Number, default: 0 },
	dislikes: { type: Number, default: 0 },
	usersLiked: { type: [String] },
	usersDisliked: { type: [String] }
});

//export du modèle de sauce

module.exports = mongoose.model('Sauce', sauceSchema);
