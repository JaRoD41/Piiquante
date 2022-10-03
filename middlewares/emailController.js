const emailValidator = require('email-validator');

//mise en place d'un contrôle de la validité de l'email

module.exports = (req, res, next) => {
	if (!emailValidator.validate(req.body.email)) {
		//contrôle de l'email entré
		res.status(400).json({
			error: process.env.INVALID_EMAIL,
		});
	} else {
		next();
	}
};