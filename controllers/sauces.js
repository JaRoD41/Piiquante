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
		userId: req.auth.userId, 
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
	console.log("req body: ", req.body)
	console.log("req file: ", req.file);
Sauce.findOne({ _id: req.params.id }).then((sauce) => {
	const filename = sauce.imageUrl.split("/images/")[1];
	fs.unlink(`images/${filename}`, () => {
		const sauceObject = req.file
			? {
					...JSON.parse(req.body.sauce),
					imageUrl: `${req.protocol}://${req.get("host")}/images/${
						req.file.filename
					}`,
			  }
			: { ...req.body };
			if (sauce.userId != req.auth.userId) {
				res.status(401).json({ message: process.env.FORBIDDEN });
			} else {
				Sauce.updateOne(
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
	Sauce.findOne({ _id: req.params.id })
	.then(sauce => {
		if (sauce.userId != req.auth.userId) {
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


/*
exports.modifySauce = (req, res) => {
	console.log("req body: ", req.body)
	console.log("req file: ", req.file);

	//soit la requète contient un fichier image pour modif ou juste une modif
	const sauceObject = req.file
		? {
				...JSON.parse(req.body.sauce), //si oui, on le remplace dans l'objet sauce
				imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
			}
		: { ...req.body }; //sinon, on modifie juste le corps de la requète sans fichier

		delete sauceObject._userId; //suppression de l'userId pour sécuriser

		Sauce.findOne({ _id: req.params.id }) //on cherche la sauce dans MongoDB
			.then((sauce) => {
				//mesure de sécurité pour empêcher un utilisateur autre que le créateur de la sauce de modifier la sauce
				sauce.userId != req.auth.userId
					? res.status(401).json({ message: process.env.FORBIDDEN })
					: Sauce.updateOne(
							//on met à jour la sauce dans MongoDB
							{ _id: req.params.id },
							{ ...req.body, _id: req.params.id }
					  )
							.then(() => res.status(200).json({ message: "Sauce modified !" }))
							.catch((error) => res.status(401).json({ error }));
			})
			.catch((error) => res.status(400).json({ error }));
};

Sauce.findOne({_id: req.params.id}).then((sauce) =>{
    const filename = sauce.imageUrl.split("/images/")[1];
    fs.unlink(`images/${filename}`,()=> {
      const sauceObject = req.file ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
      }
      : { ...req.body};
      Sauce.updateOne({_id: req.params.id}, {...sauceObject, _id: req.params.id})
      .then(() => res.status(200).json({ message: "sauce modifié !  "}))
      .catch((error) => res.status(400).json({error}));
    })
})*/