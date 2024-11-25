import axios from "axios";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogs } from "~/redux/slices/blogSlice";

const Home = () => {
  const { user } = useSelector((store) => store.user);
  const { blogs } = useSelector((store) => store.blog);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllBlogs());
  }, []);

  console.log(blogs);

  const deleteHandle = async (id) => {
    try {
      await axios.delete(`http://localhost:5002/api/blog/delete/${id}`);
      toast.success("Blog başarıyla silindi");
      dispatch(getAllBlogs());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {blogs?.map((blog) => (
        <div>
          <span>{blog.title}</span>
          <button
            onClick={() => deleteHandle(blog._id)}
            className="px-4 py-2 rounded-full text-sm bg-red-600 text-white"
          >
            sil
          </button>
        </div>
      ))}
    </div>
  );
};

export default Home;
