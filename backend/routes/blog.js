const express = require("express");
const {
  createBlog,
  getAllBlogs,
  deleteBlog,
  updateBlog,
  getBlogsByUserID,
} = require("../controllers/blog.js");
const router = express.Router();

router.post("/create", createBlog);
router.get("/all", getAllBlogs);
router.get("/get/:id", getBlogsByUserID);
router.delete("/delete/:id", deleteBlog);
router.put("/update/:id", updateBlog);

module.exports = router;
