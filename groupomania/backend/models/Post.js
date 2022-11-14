// Importation de mongoose pour utilisation de la base de donnée
const mongoose = require("mongoose");

// Création du schéma pour chaque nouveau utilisateur
const postSchema = mongoose.Schema({
  text: {
    type: String,
  },
  imageUrl: { type: String },
  userId: { type: String },
  /* Like / Dislikes */
  likes: { type: Number, defaut: 0 },
  dislikes : { type: Number, defaut: 0 },
  usersLiked : {type: [String]},
  usersDisliked :{type: [String]}
});

// On exporte le schema
module.exports = mongoose.model("Post", postSchema);
