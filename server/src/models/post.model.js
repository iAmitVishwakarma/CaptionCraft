const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   content: { type: String, required: true },
  image: { type: String, required: true },
  captions: { type: Object, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
}, { timestamps: true });

const postModel = mongoose.model("Post", postSchema);

module.exports = postModel;