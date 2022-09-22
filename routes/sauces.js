"use strict";

const express = require("express");
const router = express.Router();

const saucesCtrl = require("../controllers/sauces");
const likesCtrl = require("../controllers/likes");
const auth = require("../middlewares/auth");
const multer = require("../middlewares/multer-config");



//mise en place des routeurs pour chaque type de route avec ajout du middleware d'authentification

router.post('/', auth, multer, saucesCtrl.createSauce);

router.post('/:id/like', auth, multer, likesCtrl.likeDislikeSauce);

router.put('/:id', auth, multer, saucesCtrl.modifySauce);

router.delete('/:id', auth, saucesCtrl.deleteSauce);

router.get('/:id', auth, saucesCtrl.getOneSauce);

router.get('/', auth, saucesCtrl.getAllSauces);

//export du routeur

module.exports = router;
