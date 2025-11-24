const express = require("express");
const jwt = require("jsonwebtoken");

const userModel = require("../models/user.model");
const authMiddleware = require("../middleware/auth.middleware");

const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

const { createPostController,getHistoryController } = require("../controller/post.controller");
const routes = express.Router();

routes.post("/",authMiddleware, upload.single('image'), createPostController);
routes.get("/history", authMiddleware, getHistoryController);

module.exports = routes;


