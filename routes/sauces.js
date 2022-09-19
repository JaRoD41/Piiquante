"use strict";

const express = require("express");
const saucesCtrl = require("../controllers/sauces");
const auth = require("../middlewares/auth");
const multer = require("../middlewares/multer-config");

const router = express.Router();

//mise en place des routeurs pour chaque type de route avec ajout du middleware d'authentification

router.post('/', auth, multer, saucesCtrl.createSauce);

router.put('/:id', auth, multer, saucesCtrl.modifySauce);

router.delete('/:id', auth, saucesCtrl.deleteSauce);

router.get('/:id', auth, saucesCtrl.getOneSauce);

router.get('/', auth, saucesCtrl.getAllSauces);

//export du routeur

module.exports = router;
