"use strict";

const fs = require('fs');
const Sauce = require('../models/Sauce');
const { login } = require('./user');

exports.createSauce = (req, res) => {
	const sauceObject = JSON.parse(req.body.sauce);
	delete sauceObject._id;
	delete sauceObject._userId; 
	const sauce = new Sauce({
		...sauceObject,
		userId: req.auth.userId, //on crée l'URL de l'image téléchargée
		imageUrl: `${req.protocol}://${req.get("host")}/images/${
			req.file.filename
		}`,
	});
	sauce
		.save()
		.then(() => res.status(201).json({ message: "Sauce created !" }))
		.catch((error) => res.status(400).json({ error }));
};

exports.modifySauce = (req, res) => {
Sauce.findOne({ _id: req.params.id }).then((sauce) => {
	const filename = sauce.imageUrl.split("/images/")[1];
	fs.unlink(`images/${filename}`, () => {
		//soit la requète contient un fichier image pour modif ou juste une modif
		const sauceObject = req.file
			? {
					//si oui, on le remplace dans l'objet sauce
					...JSON.parse(req.body.sauce),
					imageUrl: `${req.protocol}://${req.get("host")}/images/${
						req.file.filename
					}`,
			  }
			: { ...req.body }; //sinon, on modifie juste le corps de la requète sans fichier
		if (sauce.userId != req.auth.userId) {
			//mesure de sécurité pour empêcher un utilisateur autre que le créateur de la sauce de modifier la sauce
			res.status(401).json({ message: process.env.FORBIDDEN });
		} else {
			Sauce.updateOne(
				//on met à jour la sauce dans MongoDB
				{ _id: req.params.id },
				{ ...sauceObject, _id: req.params.id }
			)
				.then(() => res.status(200).json({ message: "Sauce modified !" }))
				.catch((error) => res.status(400).json({ error }));
		}
	});
});
};

exports.deleteSauce = (req, res) => {
	Sauce.findOne({ _id: req.params.id }) //on cherche la sauce par son Id dans MongoDB
	.then(sauce => {
		if (sauce.userId != req.auth.userId) {
			//mesure de sécurité pour empêcher un utilisateur autre que le créateur de la sauce de supprimer la sauce
			res.status(401).json({ message: process.env.FORBIDDEN });
		} else {
			const filename = sauce.imageUrl.split('/images/')[1];
			fs.unlink(`images/${filename}`, () => { //on supprime la sauce dans la base de données ET localement dans les fichiers
				Sauce.deleteOne({ _id: req.params.id })
				.then(() => res.status(200).json({ message: "Sauce deleted !" }))
				.catch(error => res.status(401).json({ error }));
			})
		}
	})
	.catch((error) => res.status(500).json({ error }));
};

exports.getOneSauce = (req, res) => {
	Sauce.findOne({ _id: req.params.id })
		.then((sauce) => res.status(200).json(sauce)) //on affiche la sauce renvoyée par MongoDB grâce à son Id 
		.catch((error) => res.status(404).json({ error }));
};

exports.getAllSauces = (req, res) => {
	Sauce.find()
		.then((sauces) => res.status(200).json(sauces)) //on affiche le tableau des sauces renvoyé par MongoDB
		.catch((error) => res.status(400).json({ error }));
};
