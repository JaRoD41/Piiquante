// mise en place d'un package de validation de password
const passwordValidator = require("password-validator");

//creation du modele de password

const passwordSchema = new passwordValidator();

//propriétés du password
passwordSchema
	.is()
	.min(8) //minimum 8 caractères
	.is()
	.max(30) //maximum 30 caractères
	.has()
	.uppercase(1) //doit contenir une majuscule
	.has()
	.digits(2) //doit contenir au moins 2 chiffres
	.has()
	.not() // ne doit pas contenir d'espaces
	.spaces() 
	.is()
	.not()
	.oneOf(["Passw0rd", "Password1234"]); // liste de passwords exclus

module.exports = passwordSchema;
