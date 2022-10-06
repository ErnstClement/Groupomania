const Post = require("../models/Post");

// Récupération du module file-system pour faciliter les modifications sur nos sauces
var fs = require("fs");

//----création d'un nouveau post-----------------
exports.createPost = (req, res, next) => {
  console.log("req.file", req.file);
  // Création du modele du nouveau post*/
  const post = new Post({
    text: req.body.text,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
    likes: 0,
    usersLiked: [],
  });
  post
    .save() // Sauvegarde dans la BDD (Base De Donnée)
    .then(() => res.status(201).json({ message: "Post créé !" })) // Renvoi d'un status 201 avec un objet JSON
    .catch((error) => {
      console.log(error);
      res.status(400).json({ error });
    }); // renvoi erreur 400 en cas d'erreur
};
//-------------------------------------------------

//-----Récupération de tous les posts------------

exports.getAllPost = (req, res, next) => {
  // On utilise la méthode find pour obtenir la liste complète des sauces trouvées dans la base, l'array de toutes les sauves de la base de données
  Post.find()
    // Si OK on retourne un tableau de toutes les données
    .then((post) => res.status(200).json(post))
    // Si erreur on retourne un message d'erreur
    .catch((error) =>
      res.status(400).json({
        error,
      })
    );
};

//----------------------------------

//---Récupération d'une seule sauce---

exports.getOnePost = (req, res, next) => {
  // On utilise la méthode findOne et on lui passe l'objet de comparaison, on veut que l'id de la sauce soit le même que le paramètre de requête
  Post.findOne({
    _id: req.params.id,
  })
    // Si ok on retourne une réponse et l'objet
    .then((post) => res.status(200).json(post))
    // Si erreur on génère une erreur 404 pour dire qu'on ne trouve pas l'objet
    .catch((error) =>
      res.status(404).json({
        error,
      })
    );
};

//---Suppression d'un post----------------

(exports.deletePost = (req, res, next) => {
  // Avant de suppr l'objet, on va le chercher pour obtenir l'url de l'image et supprimer le fichier image de la base
  Post.findOne({
    _id: req.params.id,
  })

    .then((post) => {
      // Pour extraire ce fichier, on récupère l'url de la sauce, et on le split autour de la chaine de caractères, donc le nom du fichier
      const filename = post.imageUrl.split("/images/")[1];
      // Avec ce nom de fichier, on appelle unlink pour suppr le fichier
      fs.unlink(`images/${filename}`, () => {
        // On supprime le document correspondant de la base de données
        Post.deleteOne({
          _id: req.params.id,
        })
          .then(() =>
            res.status(200).json({
              message: "Post supprimée !",
            })
          )
          .catch((error) =>
            res.status(400).json({
              error,
            })
          );
      });
    })
    .catch(
      (error) =>
        res.status(500).json({
          error,
        }),
      console.log(res)
    );
}),
  //-------------------------------

  //---Modifications des posts--------

  (exports.modifyPost = (req, res, next) => {
    let postObject = {};
    req.file
      ? // utilisation de l'opérateur conditionel pour ne pas utiliser les if/else
        // Si la modification contient une nouvelle image
        (Post.findOne({
          _id: req.params.id, // on récupere la sauce grace à son identifiant
        }).then((post) => {
          // On supprime l'ancienne image du serveur
          const filename = post.imageUrl.split("/images/")[1];
          fs.unlinkSync(`images/${filename}`); // on supprime l'ancienne image de la base de données grace au module Files system
        }),
        (postObject = {
          // On modifie les données et on ajoute la nouvelle image
          text: req.body.text,
          imageUrl: `${req.protocol}://${req.get("host")}/images/${
            req.file.filename
          }`,
        }))
      : // Opérateur ternaire équivalent à if() {} else {} => condition ? Instruction si vrai : Instruction si faux
        // Si la modification ne contient pas de nouvelle image
        (postObject = {
          ...req.body,
        });
    Post.updateOne(
      // On applique les paramètre de sauceObject
      {
        _id: req.params.id, //récupération de l'id de la sauce
      },
      {
        ...postObject,
        _id: req.params.id,
      }
    )
      // si tout se passe comme prévu, on renvoi un code 200 avec un message de validation
      .then(() =>
        res.status(200).json({
          message: "Post modifiée !",
        })
      )
      // sinon renvoi d'un message d'erreur avec une erreur 400
      .catch((error) =>
        res.status(400).json({
          error,
        })
      );
  });
//------------------------------

//---Ajout des likes-----

exports.like = (req, res, next) => {
  // Like présent dans le body
  let like = req.body.like;
  // On prend le userID
  let userId = req.body.userId;
  // On prend l'id de la sauce
  let postId = req.params.id;

  if (like === 1) {
    // Si il s'agit d'un like
    Post.updateOne(
      {
        _id: postId,
      },
      {
        // On push l'utilisateur et on incrémente le compteur de 1
        $push: {
          usersLiked: userId,
        },
        $inc: {
          likes: +1,
        }, // On incrémente de 1
      }
    )
      // si tout se passe bien, renvoi d'un message avec un code 200
      .then(() =>
        res.status(200).json({
          message: "j'aime ajouté !",
        })
      )
      // sinon renvoi d'un code 400 avec un objet JSON error
      .catch((error) =>
        res.status(400).json({
          error,
        })
      );
  }
  if (like === -1) {
    Post.updateOne(
      // S'il s'agit d'un dislike
      {
        _id: postId,
      },
      {
        $push: {
          usersDisliked: userId,
        },
        $inc: {
          likes: -1,
        }, // On incrémente de 1
      }
    )
      .then(() => {
        res.status(200).json({
          message: "like retiré !",
        });
      })
      .catch((error) =>
        res.status(400).json({
          error,
        })
      );
  }
  if (like === 0) {
    // Si il s'agit d'annuler un like ou un dislike
    Post.findOne({
      _id: postId,
    })
      .then((post) => {
        if (post.usersLiked.includes(userId)) {
          // Si il s'agit d'annuler un like
          Post.updateOne(
            {
              _id: postId,
            },
            {
              $pull: {
                usersLiked: userId,
              },
              $inc: {
                likes: -1,
              }, // On incrémente de -1
            }
          )
            .then(() =>
              res.status(200).json({
                message: "Like retiré !",
              })
            )
            .catch((error) =>
              res.status(400).json({
                error,
              })
            );
        }
        if (post.usersDisliked.includes(userId)) {
          // Si il s'agit d'annuler un dislike
          Post.updateOne(
            {
              _id: postId,
            },
            {
              $pull: {
                usersDisliked: userId,
              },
              $inc: {
                dislikes: -1,
              }, // On incrémente de -1
            }
          )
            .then(() =>
              res.status(200).json({
                message: "Dislike retiré !",
              })
            )
            .catch((error) =>
              res.status(400).json({
                error,
              })
            );
        }
      })
      .catch((error) =>
        res.status(404).json({
          error,
        })
      );
  }
};

//----------------------------------------------------------------
