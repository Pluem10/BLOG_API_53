const jwt = require("jsonwebtoken");
require("dotenv").config();

const secret = process.env.SECRET;

const verifyToken = (req, res, next) => {
  const Token = req.headers["x-access-token"];
  if (!Token) {
    return res.status(401).send({ message: "ไม่มี Token ในการยืนยันตัวตน" });
  }
  jwt.verify(Token, secret, (err, decoded) => {
    if (err) {
      return res
        .status(403)
        .send({ message: "Token ไม่ถูกต้องไม่อนุญาตให้ใช้งาน" });
    }
    req.username = decoded.username;
    req.authorId = decoded.id;
    next();
  });
};

const authJWT = {
  verifyToken,
};

module.exports = authJWT;
