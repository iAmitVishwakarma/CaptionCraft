const express = require("express")
const { registerController, loginController } = require("../controller/auth.controller")
const authMiddleware = require("../middleware/auth.middleware");
const router  = express.Router()

router.post('/register',registerController)
router.post('/login',loginController)
router.get('/check', authMiddleware, (req, res) => {
    // If authMiddleware succeeds, the user is authenticated
    res.status(200).json({ message: "Authenticated" });
});

module.exports = router
