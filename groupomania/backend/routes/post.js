// Appel des modules pour la gestion des routes post
const express = require("express");
const router = express.Router();
const multer = require("../middleware/multer");
const authentification = require("../middleware/authentification");
const postCtrl = require("../controllers/post");

//Routes permettant la gestion des posts
router.post("/", multer, postCtrl.createPost);
router.get("/", postCtrl.getAllPost);
router.get("/:id", postCtrl.getOnePost);
router.delete("/:id", postCtrl.deletePost);
router.put("/:id", multer, postCtrl.modifyPost);
router.post("/:id/like", postCtrl.like);

module.exports = router;
