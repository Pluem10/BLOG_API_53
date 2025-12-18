const PostModel = require("../models/Post");
const mongoose = require("mongoose");

// Create a new post สร้างโพสต์ใหม่
exports.createPost = async (req, res) => {
  const { title, summary, content, cover, author } = req.body;
  if (!title || !summary || !content || !cover || !author) {
    return res.status(400).send({ message: "กรุณากรอกข้อมูลให้ครบถ้วน" });
  }
  try {
    //ตรวจสอบว่ามีโพสต์ที่มี title เดียวกันในฐานข้อมูลหรือไม่ กันการสร้างโพสต์ซ้ำ
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
      author: authorId,
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

exports.getAllPosts = async (req, res) => {};

exports.getById = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).send({ message: "กรุณาใส่ ID ของโพสต์" });
  }
  try {
    const post = await PostModel.findById(id).populate("author", ["username"]);
    if (!post) {
      return res.status(404).send({ message: "ไม่พบโพสต์ที่ต้องการ" });
    }
  } catch (error) {
    return res.status(500).send({
      message: error.message || "เกิดข้อผิดพลาดในการดึงโพสต์",
    });
  }
};

exports.getByAuthorID = async (req, res) => {
  const { authorID } = req.params;
  const authorId = req.authorId;
  const authorToFind = authorID || authorId;
  if (!authorToFind) {
    return res.status(400).send({ message: "กรุณาใส่ ID ผู้เขียน" });
  }
  try {
    const posts = await PostModel.find({ author: authorToFind })
      .populate("author", ["username"])
      .sort({ createdAt: -1 });

    if (!posts || posts.length === 0) {
      return res.status(404).send({ message: "ไม่พบโพสต์ของผู้เขียนนี้" });
    }

    res.send({ data: posts });
  } catch (error) {
    return res.status(500).send({
      message: error.message || "เกิดข้อผิดพลาดในการดึงโพสต์ของผู้เขียน",
    });
  }
};
exports.upDatePost = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).send({ message: "กรุณาใส่ ID ของโพสต์" });
  }
  const { title, summary, content, cover } = req.body;
  const authorId = req.authorId;
  if (!title || !summary || !content || !cover) {
    return res.status(400).send({ message: "กรุณากรอกข้อมูลให้ครบถ้วน" });
  }
  try {
    const postDoc = await PostModel.findOne({ _id: id, author: authorId });
    if (!postDoc) {
      return res
        .status(404)
        .send({ message: "ไม่พบโพสต์ของผู้เขียนที่จะอัปเดต" });
    }

    const newPost = await PostModel.findByIdAndUpdate(
      { author: authorId, _id: id },
      {
        title,
        summary,
        content,
        cover,
      },
      { new: true }
    );
      if (!newPost) {
        return res.status(404).send({ message: "ไม่พบโพสต์ที่จะอัปเดต" });
      }
      res.send({ message: "อัปเดตโพสต์สำเร็จ" });
    }
  };
  catch (error) {
    return res.status(500).send({
      message: error.message || "เกิดข้อผิดพลาดในการอัปเดตโพสต์",
    });
    }

exports.deletePost = async (req, res) => {
  const { id } = req.params;
  const authorId = req.authorId;
  if (!id) {
    return res.status(400).send({ message: "กรุณาใส่ ID ของโพสต์" });
  }
  try {
    const postDoc = await PostModel.findOneAndDelete({ _id: id, author: authorId });
    if (!postDoc) {
      return res.status(500).send({ message: "ไม่สามารถลบโพสต์ได้" });
    }
    res.send({ message: "ลบโพสต์สำเร็จ" });
  } catch (error) {
    return res.status(500).send({
      message: error.message || "เกิดข้อผิดพลาดในการลบโพสต์",
    });
  }
};
