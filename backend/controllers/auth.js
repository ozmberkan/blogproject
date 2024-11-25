const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Auth = require("../models/Auth");

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const user = await Auth.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "Kullanıcı zaten kayıt olmuş!" });
    }

    if (!username || !email || !password) {
      return res.status(400).json({ message: "Lütfen tüm alanları doldurun!" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await Auth.create({
      username,
      email,
      password: hashedPassword,
    });

    const userToken = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("authToken", userToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 3600000,
    });

    res.status(200).json({
      status: "OK",
      newUser,
      token: userToken,
    });
  } catch (error) {
    return res.status(500).json({ message: "Sunucu Hatası" });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await Auth.findOne({ username });

    if (!user) {
      return res.status(400).json({ message: "Kullanıcı bulunamadı!" });
    }

    const comparedPassword = await bcrypt.compare(password, user.password);

    if (!comparedPassword) {
      return res.status(400).json({ message: "Hatalı şifre!" });
    }

    const userToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("authToken", userToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 3600000,
    });

    res.status(200).json({
      status: "OK",
      user,
      token: userToken,
    });
  } catch (error) {
    return res.status(500).json({ message: "Sunucu Hatası" });
  }
};

const logout = (req, res) => {
  try {
    res.clearCookie("authToken");
    res.status(200).json({ message: "Çıkış yapıldı!" });
  } catch (error) {
    return res.status(500).json({ message: "Sunucu Hatası" });
  }
};

module.exports = { register, login, logout };
