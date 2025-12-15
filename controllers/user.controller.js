const bcrypt = require("bcrypt");
const UserModel = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { secret } = process.env;

// Register a new user สร้างผู้ใช้ใหม่
exports.register = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "กรุณาใส่  username เเละ password" });
  }
  const existingUser = await UserModel.findOne({ username });
  if (existingUser) {
    return res.status(400).json({ message: "username นี้มีผู้ใช้เเล้ว" });
  }
  try {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const user = await UserModel.create({
      username,
      password: hashedPassword,
    });
    res.send({ message: "สมัครสมาชิกสำเร็จ", user });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "เกิดข้อผิดพลาดในการเข้ารหัสรหัสผ่าน",
    });
  }
};

// Login ผู้ใช้เข้าสู่ระบบ
exports.login = async (req, res) => {
  // 1 เช็กว่ามี username เเละ password มั้ย
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .send({ message: "กรุณาใส่  username เเละ password" });
  }
  // 2 หา username จากฐานข้อมูลว่ามีไหมในฐานข้อมูล
  try {
    const userdDoc = await UserModel.findOne({ username: username });
    if (!userdDoc) {
      return res.status(400).send({ message: "ไม่พบ ผู้ใช้ในระบบ" });
    }
    // 3 จะรู้ได้ไงว่า password ในฐานข้อมูลตรงกับที่ดึงมา เพราะรหัสผ่านถูกเข้ารหัสไว้ ต้องใช้ bcrypt ในการเปรียบเทียบ ใช้ function bcrypt.compareSync(รหัสผ่านที่รับมา, รหัสผ่านที่เข้ารหัสในฐานข้อมูล)
    const isPasswordMatched = bcrypt.compare(password, userdDoc.password);
    if (!isPasswordMatched) {
      return res.status(401).send({ message: "รหัสผ่านไม่ถูกต้อง" });
    }
    // สร้าง token เพื่อยืนยันตัวตนผู้ใช้ต่อไปในอนาคต โดยใช้ jsonwebtoken ในการสร้าง token โดยใช้ user id เป็นข้อมูลภายใน token และใช้ความลับ (secret) ที่กำหนดไว้ในไฟล์ config/auth.config.js
    jwt.sign({ username, id: userdDoc._id }, secret, {}, (err, token) => {
      if (err) {
        res.status(500).send({ message: "เกิดข้อผิดพลาดในการสร้าง token" });
      }
      res.send({ message: "เข้าสู่ระบบสำเร็จ", accessToken: token });
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "เกิดข้อผิดพลาดในการเข้าสู่ระบบ",
    });
  }
};
