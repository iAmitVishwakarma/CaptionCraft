const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');


async function authMiddleware(req, res, next) {
  console.log("Auth middleware called, checking token..."+ ""  + req.cookies.token);

  const token = req.cookies.token;
  

  if (!token) {
    console.log("No token found, returning unauthorized");
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_Secret_Key);
  const user = await userModel.findOne({ _id: decoded.id })
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    //Attach user to request object
    req.user = user;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Invalid token, please login first" });
  }
}


module.exports = authMiddleware;
