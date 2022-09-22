"use strict";

const fs = require('fs');
const Sauce = require('../models/Sauce');
const { login } = require('./user');

exports.createSauce = (req, res) => {
	const sauceObject = JSON.parse(req.body.sauce);
	delete sauceObject._id;
	delete sauceObject._userId; //à mettre en com si pb
	const sauce = new Sauce({
		...sauceObject,
		userId: req.auth.userId, //à mettre en com si pb
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
	Sauce.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
		.then(() => res.status(200).json({ message: "Sauce modified !" }))
		.catch((error) => res.status(400).json({ error }));
};

exports.deleteSauce = (req, res) => {
	Sauce.findOne({ _id: req.params.id })
	.then(sauce => {
		if (sauce.userId != req.auth.userId) {
			//à mettre en com et si pb !sauce.userId
			res.status(401).json({ message: process.env.FORBIDDEN });
		} else {
			const filename = sauce.imageUrl.split('/images/')[1];
			fs.unlink(`images/${filename}`, () => {
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
		.then((sauce) => res.status(200).json(sauce))
		.catch((error) => res.status(404).json({ error }));
};

exports.getAllSauces = (req, res) => {
	Sauce.find()
		.then((sauces) => res.status(200).json(sauces)) //on affiche le tableau des sauces renvoyé par MongoDB
		.catch((error) => res.status(400).json({ error }));
};
