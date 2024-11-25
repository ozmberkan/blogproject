const Blog = require("../models/blog.js");

const createBlog = async (req, res) => {
  try {
    const { title, content, imageURL, category, createdBy } = req.body;

    if (!title || !content || !imageURL || !category) {
      return res.status(400).json({ message: "Tüm alanları doldurunuz" });
    }

    const blog = await Blog.create({
      title,
      content,
      imageURL,
      category,
      createdBy,
    });

    res.status(201).json({ message: "Blog başarıyla oluşturuldu", blog });
  } catch (error) {
    return res.status(500).json({ message: "Sunucu hatası" + error });
  }
};

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({});
    res.status(200).json(blogs);
  } catch (error) {
    return res.status(500).json({ message: "Sunucu hatası" + error });
  }
};

const getBlogsByUserID = async (req, res) => {
  try {
    const { id } = req.params;

    const blogs = await Blog.find({ createdBy: id });

    if (blogs.length === 0) {
      return res
        .status(404)
        .json({ message: "Bu kullanıcı için blog bulunamadı." });
    }

    res.status(200).json({ blogs });
  } catch (error) {
    console.error("Hata:", error);
    res.status(500).json({ message: "Sunucu hatası." });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "ID bulunamadı" });
    }

    const blog = await Blog.findByIdAndDelete(id);
    res.status(200).json({ message: "Blog başarıyla silindi", blog });
  } catch (error) {
    return res.status(500).json({ message: "Sunucu hatası" + error });
  }
};

const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedBlog = await Blog.findByIdAndUpdate(id, req.body);

    res
      .status(200)
      .json({ message: "Blog başarıyla güncellendi", updatedBlog });
  } catch (error) {
    return res.status(500).json({ message: "Sunucu hatası!" });
  }
};

module.exports = {
  createBlog,
  getAllBlogs,
  deleteBlog,
  updateBlog,
  getBlogsByUserID,
};
