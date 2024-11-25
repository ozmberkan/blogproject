import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllBlogs } from "~/redux/slices/blogSlice";

const Home = () => {
  const { blogs } = useSelector((store) => store.blog);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllBlogs());
  }, []);

  return (
    <>
      <div>
        {blogs?.map((blog) => (
          <div>
            <span>{blog.title}</span>
            <Link
              to={`/detail/${blog._id}`}
              className="px-4 py-2 rounded-full bg-sky-500 text-white"
            >
              daha fazla
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
