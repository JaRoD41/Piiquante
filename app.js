"use strict";

const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const dotenv = require('dotenv');
const path = require('path');

//mise en place d'un limiteur de connexion pour éviter les attaques
const rateLimit = require("express-rate-limit");

//définition des caractéristiques du limiteur de connexion
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // fenêtre de 15 minutes
	max: 5, // Limite chaque IP à 5 connexions max par fenêtre de 15 minutes
	standardHeaders: true, // Retourne la limitation dans le header `RateLimit-*`
	legacyHeaders: false, // désactive les headers `X-RateLimit-*`
});

dotenv.config();

const saucesRoutes = require('./routes/sauces');
const userRoutes = require('./routes/user');

const app = express();

app.use(express.json()); //afin d'extraire le corps JSON des requêtes POST //
app.use(morgan('dev'));

mongoose
	.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => console.log(process.env.MONGO_SUCCESS))
	.catch(() => console.log(process.env.MONGO_FAIL));

//mise en place de headers spécifiques afin d'éviter les erreurs CORS

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

//définition des différents paths et sécurités pour l'utilisation des routes
app.use('/api/sauces', saucesRoutes);
app.use('/api/auth', userRoutes, limiter);
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;
