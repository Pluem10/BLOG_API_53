const bcrypt = require("bcrypt");
const UserModel = require("../models/User");
const salt = bcrypt.genSaltSync(10);

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
    const hashedPassword = bcrypt.hashSync(password, salt);
    const user = new UserModel({ username, password: hashedPassword });
    res.send({ message: "สมัครสมาชิกสำเร็จ", user });
  } catch (error) {
    return res
      .status(500)
      .json({
        message: error.message || "เกิดข้อผิดพลาดในการเข้ารหัสรหัสผ่าน",
      });
  }
};
