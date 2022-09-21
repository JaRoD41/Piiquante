"use strict";

const Sauce = require('../models/Sauce');

exports.likeDislikeSauce = (req, res) => {
  console.log("je SUIS dans le controleur LIKE via POSTMAN !");

  //je récupère l'id de la sauce affichée, l'id de l'utilisateur en cours et l'état du like en cours
  
  let likeChoice = req.body.like;
  let userId = req.body.userId;
  let pickedSauce = req.params.id;

  //déclaration des futures conditions du ternaire pour la présence de l'user dans l'array
  let isLiked = usersLiked.includes(userId);
  let isDisliked = usersDisliked.includes(userId);

  /*la requète sera envoyée sous ce format dans body-->raw en JSON dans postman
  {
    "userId": "63282b78ce0ad312971ea4d4",
    "like": 1
  }
  */

  //mise en place d'un switch pour traiter les 3 cas possibles de like/dislike 

  switch (likeChoice) {
    case 1: 
      console.log("picked sauce :", pickedSauce);
      Sauce.updateOne(
				{ _id: req.params.id },
				{
					$inc: { likes: likeChoice, dislikes: likeChoice },
					$push: { usersLiked: userId },
				}
			)
				.then((sauce) => {
					console.log("contenu résultat promesse :", sauce);
				})
				.catch((error) => res.status(400).json({ error }));


      /*Sauce.updateOne(
				{ _id: req.params.id },
				{ likes: req.body.like, usersLiked: likedArray, _id: require.params.id }
			)
				.then(() => res.status(200).json({ message: "like pris en compte !" }))
				.catch((error) => res.status(400).json({ error }));*/
      break;
    case -1:
      console.log("je perds un like");
      break;
    case 0:
      console.log("je suis neutre");
  }



  //like = 0 (pas de vote, likes = 0 )




  //like = -1 (dislikes = +1 )




  //like = 0 (dislikes = 0 )



};