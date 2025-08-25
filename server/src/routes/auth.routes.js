const express = require("express")
const { registerController, loginController } = require("../controller/auth.controller")
const authMiddleware = require("../middleware/auth.middleware");
const router  = express.Router()

router.post('/register',registerController)
router.post('/login',loginController)
router.get('/check', authMiddleware, (req, res) => {
    if(req.user) {
      res.status(200).json({ message: "Authenticated" });
    } else {
      res.status(401).json({ message: "Not Authenticated" });
    }
});

module.exports = router
