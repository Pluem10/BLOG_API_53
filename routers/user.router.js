const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

// GET http://localhost:5000/api/v1/users/register
router.post("/register", userController.register);

// POST http://localhost:5000/api/v1/users/login
router.post("/login", userController.login);

module.exports = router;
