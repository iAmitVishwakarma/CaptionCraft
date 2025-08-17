const express = require("express");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
const authMiddleware = require("../middleware/auth.middleware");
const multer = require("multer");
const { createPostController } = require("../controller/post.controller");



const routes = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

routes.post("/", authMiddleware, upload.single("image"), createPostController);

module.exports = routes;
