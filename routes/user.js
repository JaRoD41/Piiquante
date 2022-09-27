//mise en place d'un routeur Express

const express = require('express');
const router = express.Router();

//mise en place d'un controlleur pour associer fonctions/routes

const userCtrl = require('../controllers/user');

//on crée 2 routes POST pour la création et l'authentification de l'utilisateur

router.post('/signup', userCtrl.signup);

router.post('/login', userCtrl.login);

module.exports = router;
