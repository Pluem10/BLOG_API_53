const express = require("express");
const router = express.Router();
const postController = require("../controllers/post.controller");
const authJWT = require("../middleware/authJWT.middleware");

// POST http://localhost:5000/api/v1/posts
router.post("", authJWT.verifyToken, postController.createPost);

// GET http://localhost:5000/api/v1/posts
router.get("", postController.getAllPosts);

// PUT http://localhost:5000/api/v1/posts/:id
router.put("/:id", authJWT.verifyToken, postController.upDatePost);

// Delete http://localhost:5000/api/v1/posts/:id
router.delete("/:id", authJWT.verifyToken, postController.deletePost);

module.exports = router;
