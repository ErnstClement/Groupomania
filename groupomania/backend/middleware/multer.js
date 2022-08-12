const multer = require("multer");

// Type de fichiers autorisé

const MYME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

// Création de la destination ou multer va enrengistrer les images et les gerer ensuite

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images");
  },
  filename: (req, file, callback) => {
    // Suppression des espaces dans le nom du fichier
    const name = file.originalname.split(" ").join("_");
    const extension = MYME_TYPES[file.mimetype];
    callback(null, name + Date.now() + "." + extension);
  },
});
module.exports = multer({ storage }).single("image");
