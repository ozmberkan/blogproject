const jwt = require("jsonwebtoken");
const Auth = require("../models/Auth");

const verifyUser = async (req, res, next) => {
  try {
    const token = req.cookies.authToken;

    if (!token) {
      return res.status(401).json({ message: "Yetkisiz erişim!" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await Auth.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "Kullanıcı bulunamadı!" });
    }

    req.user = user;

    next(); // Middleware'i sonlandırır ve bir sonraki middleware'e geçer.
  } catch (error) {
    return res.status(500).json({ message: "Sunucu Hatası" });
  }
};

module.exports = verifyUser;
