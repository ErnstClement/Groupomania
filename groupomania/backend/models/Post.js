// Importation de mongoose pour utilisation de la base de donnée
const mongoose = require("mongoose");

// Création du schéma pour chaque nouveau utilisateur
const postSchema = mongoose.Schema({
  email: {
    type: String,
    require: [true, "Veuillez entrer une adresse email"],
    unique: true,
  },
  password: { type: String, require: true },
});

// On exporte le schema
module.exports = mongoose.model("Post", postSchema);
