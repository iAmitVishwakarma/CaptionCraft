const postModel = require("../models/post.model");
const generateCaption = require("../service/ai.service");
const uploadImage = require("../service/storage.service");
const { v4: uuid } = require("uuid");

async function createPostController(req, res) {
  try {
    console.log("Incoming request:", {
      hasFile: !!req.file,
      hasUser: !!req.user,
      userId: req.user?._id,
    });

    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "No image file uploaded" });
    }

    const base64ImageFile = Buffer.from(file.buffer).toString("base64");
    console.log("Image converted to base64, length:", base64ImageFile.length);

    console.log(
      "Starting parallel processing: AI Caption Generation + Image Upload"
    );

    const [captions, uploadResult] = await Promise.all([
      generateCaption(base64ImageFile),
      uploadImage(file.buffer, `${uuid()}`),
    ]);

    console.log("Parallel processing completed");
    console.log("Captions generated:", captions);

    const post = await postModel.create({
      userId: req.user._id,
      captions: {
        Caption1: captions.Caption1,
        Caption2: captions.Caption2,
      },
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

const getHistoryController = async (req, res) => {
  try {
    const posts = await postModel
      .find({ userId: req.user._id })
      .sort({ createdAt: -1 }); // Newest first

    res.status(200).json({
      message: "History fetched successfully",
      data: posts,
    });
  } catch (error) {
    console.error("Error fetching history:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  createPostController,
  getHistoryController,
};
