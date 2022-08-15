// Importation de mongoose pour utilisation de la base de donnée
const mongoose = require("mongoose");

// Création du schéma pour chaque nouveau utilisateur
const postSchema = mongoose.Schema({
  text: {
    type: String,
  },
  imageUrl: { type: String },
  likes: 0,
  usersLiked: [],
});

// On exporte le schema
module.exports = mongoose.model("Post", postSchema);
