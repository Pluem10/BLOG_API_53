const express = require("express");
const router = express.Router();
const Postcontroller = require("../controllers/post.controller");

// POST http://localhost:5000/api/v1/posts/createpost
router.post("/createpost", Postcontroller.createPost);

// GET http://localhost:5000/api/v1/posts/allpost
router.get("/allpost", Postcontroller.getAllPost);

module.exports = router;
