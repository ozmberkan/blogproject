const express = require("express");
const router = express.Router();
const { register, login, logout } = require("../controllers/auth");
const verifyUser = require("../middleware/auth");

router.post("/register", register);
router.post("/login", login);
router.get("/profile", verifyUser, (req, res) => {
  res.status(200).json({
    message: "Kullanıcı verileri başarıyla getirildi!",
    user: req.user,
  });
});
router.get("/logout", logout);

module.exports = router;
