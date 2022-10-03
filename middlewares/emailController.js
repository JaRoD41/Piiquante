const emailValidator = require('email-validator');

//mise en place d'un contrôle de la validité de l'email

module.exports = (req, res, next) => {
  try {
    if (!emailValidator.validate(req.body.email)) {
      throw process.env.INVALID_EMAIL;
    } else {
      next();
    }

  } catch(error) {
    res.status(400).json({ error: process.env.INVALID_EMAIL });
  }};