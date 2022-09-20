"use strict";

const express = require("express");
const router = express.Router();

const saucesCtrl = require("../controllers/sauces");
const auth = require("../middlewares/auth");
const multer = require("../middlewares/multer-config");



//mise en place des routeurs pour chaque type de route avec ajout du middleware d'authentification

router.post('/', multer, saucesCtrl.createSauce);

router.put('/:id', multer, saucesCtrl.modifySauce);

router.delete('/:id', saucesCtrl.deleteSauce);

router.get('/:id', saucesCtrl.getOneSauce);

router.get('/', saucesCtrl.getAllSauces);

//export du routeur

module.exports = router;
