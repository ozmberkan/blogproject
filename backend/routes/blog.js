const express = require("express");
const {
  createBlog,
  getAllBlogs,
  deleteBlog,
  updateBlog,
  getBlogsByUserID,
  getBlogDetailByID,
} = require("../controllers/blog.js");
const router = express.Router();

router.post("/create", createBlog);
router.get("/all", getAllBlogs);
router.get("/get/:id", getBlogsByUserID);
router.delete("/delete/:id", deleteBlog);
router.put("/update/:id", updateBlog);
router.get("/detail/:id", getBlogDetailByID);

module.exports = router;
