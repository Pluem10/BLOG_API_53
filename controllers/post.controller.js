const PostModel = require("../models/Post");

// Create a new post สร้างโพสต์ใหม่
exports.createPost = async (req, res) => {
  const { title, summary, content, cover, author } = req.body;
  if (!title || !summary || !content || !cover || !author) {
    return res.status(400).send({ message: "กรุณากรอกข้อมูลให้ครบถ้วน" });
  }
  try {
    // ตรวจสอบว่ามีโพสต์ที่มี title เดียวกันในฐานข้อมูลหรือไม่ กันการสร้างโพสต์ซ้ำ
    const existingPost = await PostModel.findOne({ title });
    if (existingPost) {
      return res
        .status(400)
        .send({ message: "โพสต์นี้มีอยู่เเล้วหรือชื่อถูกใช้ไปเเล้ว" });
    }
    const postDoc = await PostModel.create({
      title,
      summary,
      content,
      cover,
      author,
    });

    if (!postDoc) {
      return res.status(404).send({ message: "สร้างโพสต์ไม่สําเร็จ" });
    }
    res.status(201).send({ message: "สร้างโพสต์สำเร็จ", data: postDoc });
  } catch (error) {
    return res.status(500).send({
      message: error.message || "เกิดข้อผิดพลาดในการสร้างโพสต์",
    });
  }
};
