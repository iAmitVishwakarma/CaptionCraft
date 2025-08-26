const express = require("express");
const jwt = require("jsonwebtoken");

const userModel = require("../models/user.model");
const authMiddleware = require("../middleware/auth.middleware");

const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

const { createPostController } = require("../controller/post.controller");
const routes = express.Router();

routes.post("/", upload.single('image'), createPostController);

module.exports = routes;


