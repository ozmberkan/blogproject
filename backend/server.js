const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db.js");
const AuthRoutes = require("./routes/auth.js");

dotenv.config();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Sunucu başarılı bir şekilde yanıt veriyor!");
});

app.use("/api/auth", AuthRoutes);

connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Server is running on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.error("Veritabanı bağlantı hatası:", error);
    process.exit(1);
  });
