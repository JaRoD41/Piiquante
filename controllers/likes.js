"use strict";

const Sauce = require('../models/Sauce');

exports.likeDislikeSauce = (req, res) => { 

  Sauce.findOne({ _id: req.params.id })
		.then((sauce) => {
			//mise en place d'un switch pour traiter les 3 cas possibles de like/dislike

			//switch(req.body.like) {


			//}	

			//si le tableau usersLiked ne contient pas ce userId ET que le likes vaut 1

			if (!sauce.usersLiked.includes(req.body.userId) && req.body.like === 1) {
				console.log("front like=1 et userId non présent dans usersLiked");

				//Mise à jour de la base MongoDB

				Sauce.updateOne(
					{ _id: req.params.id },
					{
						$inc: { likes: 1 },
						$push: { usersLiked: req.body.userId },
					}
				)
					.then(() => res.status(201).json({ message: "like vaut 1 !" }))
					.catch((error) => res.status(400).json({ error }));
			}

			//like = 0 (pas de vote, likes = 0 )
			//si le tableau usersLiked contient ce userId ET que le likes vaut 0

			if (sauce.usersLiked.includes(req.body.userId) && req.body.like === 0) {
				console.log("front like=0 et userId présent dans usersLiked");

				//Mise à jour de la base MongoDB

				Sauce.updateOne(
					{ _id: req.params.id },
					{
						$inc: { likes: -1 }, //si la valeur du like vaut 0, on incrémente de -1
						$pull: { usersLiked: req.body.userId },
					}
				)
					.then(() => res.status(201).json({ message: "like vaut 0 !" }))
					.catch((error) => res.status(400).json({ error }));
			}

			//like = -1 (vote négatif, dislikes = 1 )
			//si le tableau usersDisliked ne contient pas ce userId ET que le dislikes vaut -1

			if (
				!sauce.usersDisliked.includes(req.body.userId) &&
				req.body.like === -1
			) {
				console.log("front like = -1 et userId absent de usersDisliked");

				//Mise à jour de la base MongoDB

				Sauce.updateOne(
					{ _id: req.params.id },
					{
						$inc: { dislikes: 1 }, //si la valeur du like vaut -1, on incrémente dislikes de 1
						$push: { usersDisliked: req.body.userId },
					}
				)
					.then(() => res.status(201).json({ message: "dislike vaut -1 !" }))
					.catch((error) => res.status(400).json({ error }));
			}

			//dislike = 0 (pas de vote, dislikes = 0 )
			//si le tableau usersLiked contient ce userId ET que le dislikes vaut 0

			if (
				sauce.usersDisliked.includes(req.body.userId) &&
				req.body.like === 0
			) {
				console.log("front dislike = 0 et userId présent dans usersDisliked");

				//Mise à jour de la base MongoDB

				Sauce.updateOne(
					{ _id: req.params.id },
					{
						$inc: { dislikes: -1 }, //si la valeur du like vaut 0, on incrémente de -1
						$pull: { usersDisliked: req.body.userId },
					}
				)
					.then(() => res.status(201).json({ message: "dislike vaut 0 !" }))
					.catch((error) => res.status(400).json({ error }));
			}
		})
		.catch((error) => res.status(400).json({ error }));

    

  };



  /*like = 0 (pas de vote, likes = 0 )
//si le tableau des likes contient ce userId ET que le like vaut 0

			if (sauce.usersLiked.includes(req.body.userId) && req.body.like === 0) {
				console.log("front like=0 et userId présent dans usersLiked");

				//Mise à jour de la base MongoDB

				Sauce.updateOne(
					{ _id: req.params.id },
					{
						$inc: { likes: -1 }, //si la valeur du like vaut 0, on incrémente de -1
						$pull: { usersLiked: req.body.userId },
					}
				)
					.then(() =>
						res.status(201).json({ message: "like/dislike vaut 0 !" })
					)
					.catch((error) => res.status(400).json({ error }));
			}
*/


  //like = -1 (dislikes = +1 )




  //like = 0 (dislikes = 0 )



