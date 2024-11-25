const express = require("express");
const {
  createBlog,
  getAllBlogs,
  deleteBlog,
} = require("../controllers/blog.js");
const router = express.Router();

router.post("/create", createBlog);
router.get("/all", getAllBlogs);
router.delete("/delete/:id", deleteBlog);

module.exports = router;
