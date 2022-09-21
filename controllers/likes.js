"use strict";

const Sauce = require('../models/Sauce');

exports.likeDislikeSauce = (req, res) => {
  console.log("req Body :", req.body);

  let likes = req.body.like;
  let userId = req.body.userId;
  let pickedSauce = req.params.id;

  console.log("userId :", userId);
  console.log("likes :", likes);
  console.log("pickedSauce :", pickedSauce);
};