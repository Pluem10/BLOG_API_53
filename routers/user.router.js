const express = require("express");
const router = express.Router();
const Usercontroller = require("../controllers/user.controller");

// GET http://localhost:5000/api/v1/users/register
router.post("/register", Usercontroller.register);

// POST http://localhost:5000/api/v1/users/login
router.post("/login", Usercontroller.login);

module.exports = router;
