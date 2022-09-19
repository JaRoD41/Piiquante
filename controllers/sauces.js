"use strict";

const Sauce = require('../models/Sauce');

exports.createSauce = (req, res) => {
	const sauceObject = JSON.parse(req.body.sauce);
	delete sauceObject._id;
	delete sauceObject._userId;
	const sauce = new Sauce({
		...sauceObject,
		userId: req.auth.userId,
		imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
	});
	//console.log("file :", req.file);
	//console.log("params :", req.params);
	//console.log("sauce body :", req.body);
	sauce
		.save()
		.then(() => res.status(201).json({ message: "Sauce enregistrée !" }))
		.catch((error) => res.status(400).json({ error }));
};

exports.modifySauce = (req, res) => {
	Sauce.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
		.then(() => res.status(200).json({ message: "Sauce modifiée !" }))
		.catch((error) => res.status(400).json({ error }));
};

exports.deleteSauce = (req, res) => {
	Sauce.deleteOne({ _id: req.params.id })
		.then(() => res.status(200).json({ message: "Sauce supprimée !" }))
		.catch((error) => res.status(400).json({ error }));
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

/* backup du controleur createSauce avant modif pour multer

exports.createSauce = (req, res) => {
	delete req.body._id;
	const sauce = new Sauce({
		...req.body
	});
  console.log("file :", req.file);
  console.log("params :", req.params);
  console.log("sauce :", req.body);
	sauce
		.save()
		.then(() => res.status(201).json({ message: "Sauce enregistrée !" }))
		.catch((error) => res.status(400).json({ error }));
};

*/