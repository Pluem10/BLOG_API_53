const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const PostSchema = new Schema(
  {
    // id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    summary: { type: String, required: true, min: 10, max: 600 },
    content: { type: String, required: true },
    cover: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: "USER", required: true },
  },
  {
    timestamps: true,
  }
);

const PostModel = model("Post", PostSchema);
module.exports = PostModel;
