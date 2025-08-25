const postModel = require("../models/post.model");
const generateCaption = require("../service/ai.service");
const uploadImage = require("../service/storage.service");
const { v4: uuid } = require("uuid");

async function createPostController(req, res) {
  try {
    const file = req.file;

    const base64ImageFile = Buffer.from(file.buffer).toString("base64");

    const Caption = await generateCaption(base64ImageFile);

    const uploadResult = await uploadImage(file.buffer, `${uuid()}`);

    const post = await postModel.create({
      userId: req.user.id,        
      caption: Caption,         
      image: uploadResult.url,   
    });

    res.status(201).json({
      message: "Post created successfully",
      data: post,
    });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = {
  createPostController,
};