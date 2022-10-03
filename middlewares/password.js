const passwordSchema = require('../models/validator');

//création du middleware de contôle de la complexité du password 

module.exports = (req, res, next) => {
	if (!passwordSchema.validate(req.body.password)) { //on peut encore lire le mot de passe non hashé
		res.status(400).json({
			error: process.env.INVALID_PASSWORD
		});
			
	} else {
		next();
	}
};